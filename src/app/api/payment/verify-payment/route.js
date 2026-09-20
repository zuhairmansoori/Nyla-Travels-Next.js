import crypto from 'crypto';
import Booking from "@/model/bookingModel";
import { NextResponse } from "next/server";
import connectDB from "@/lib/MongoDB";

export async function POST(req) {
    try {
         await connectDB();
        const { booking_id, razorpay_payment_id, razorpay_signature } = await req.json();
        const booking = await Booking.findById(booking_id);
        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }
        const orderId = booking.razorpay.orderId;
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(orderId + "|" + razorpay_payment_id)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            booking.paymentStatus = "failed";
            await booking.save();
            return NextResponse.json({ message: "Payment verification failed" }, { status: 400 });
        }
        // ✅ Payment verified
        booking.paymentStatus = "paid";
        booking.bookingStatus = "confirmed";
        booking.razorpay.paymentId = razorpay_payment_id;
        booking.razorpay.signature = razorpay_signature;

        await booking.save();

        return Response.json({
            success: true,
            message: "Payment verified successfully",
        });

    } catch (error) {
         return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}