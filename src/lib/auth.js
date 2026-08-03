import { betterAuth } from "better-auth";
import connectDB from "./MongoDB";
import mongoose from "mongoose";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { oneTap } from "better-auth/plugins"
import { Resend } from 'resend'
import WelcomeEmail from '@/components/WelcomEmail';
const resend = new Resend(process.env.RESEND_API_KEY);
await connectDB()
// console.log('db was connected')
const client = mongoose.connection.getClient()
// console.log(client.db("NylaTravels").databaseName);
export const auth = betterAuth({
    database: mongodbAdapter(client.db("NylaTravels")),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [
        "https://nylatravels.com",
        "https://www.nylatravels.com"
    ],
    user: {
        additionalFields: {
            role: {
                type: String,
                required: false,
                defaultValue: "user", // static default, no ctx needed
                input: false, // prevent client from setting this directly
            }
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.email === "zuhairakhter2002@gmail.com" ? "admin" : "user",
                        },
                    };
                },
                after: async (user) => {
                
                    if (user.role === "user") {
                        try {
                            const { data ,error } = await resend.emails.send({
                                from: "Nyla Travels <support@nylatravels.com>",
                                to: user.email,
                                subject: "Welcome to Nyla Travels!",
                                react: WelcomeEmail({
                                    userFirstname: user.name ?? "Traveler",
                                    loginUrl: "https://nylatravels.com",
                                }),
                            });
                            // console.log("Welcome email sent:", data);
    
                            if (error) {
                                console.error("Resend welcome email error:", error);
                            }
                        } catch (err) {
                            // Never throw here — a failed email shouldn't block signup
                            console.error("Failed to send welcome email:", err);
                        }
                    }
                },
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            mapProfileToUser: (profile) => ({
                image: profile.picture,  // Google image
                name: profile.name,
                email: profile.email,
            })
        }
    },
    plugins: [
        oneTap()
    ]
}
)