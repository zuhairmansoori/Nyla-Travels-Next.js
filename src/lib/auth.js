import { betterAuth } from "better-auth";
import connectDB from "./MongoDB";
import mongoose from "mongoose";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import {oneTap} from "better-auth/plugins"
await connectDB()
console.log('db was connected')
const client = mongoose.connection.getClient()
console.log(client.db("NylaTravels").databaseName);
export const auth = betterAuth({
    database: mongodbAdapter(client.db("NylaTravels")),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
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
    plugins:[
        oneTap()
    ]
}
)