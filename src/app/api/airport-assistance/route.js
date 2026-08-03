import AirportAssistance from "@/model/assistnceModel";
import connectDB from "@/lib/MongoDB";
import {Resend} from 'resend'
import { NextResponse } from "next/server";
import { customerConfirmationTemplate } from "@/lib/emailTemplates";

export async function POST(req){
    try{
        await connectDB();
        const data = await req.json();
        const newRequest = AirportAssistance.create(data);
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Nyla Travels <support@nylatravels.com>",
            to: data.email,
            subject: "Airport Assistance Request Received",
            html: customerConfirmationTemplate(data),
        });
        return NextResponse.json({ success: true, data: newRequest });
    } catch (error) {
        console.error("Error submitting airport assistance request:", error);
        return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
    }
}