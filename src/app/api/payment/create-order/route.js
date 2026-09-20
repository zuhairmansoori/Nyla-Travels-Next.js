import {NextResponse } from "next/server";
import rzp from "@/lib/razorpay";
import Booking from "@/model/bookingModel";

export async function POST(req){
    try {
        const {bookingId} = await req.json();
      
        const booking = await Booking.findById(bookingId);
        if(!booking){
            return NextResponse.json({message: "Booking not found"}, {status: 404});
        } 
        const options = {
            amount: booking.pricing.total * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: booking.bookingNumber,
        };
        const order = await rzp.orders.create(options);
        booking.razorpay.orderId = order.id;
        booking.paymentMethod = "razorpay";
        booking.paymentStatus = "pending";
        await booking.save();
        return NextResponse.json({order}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}