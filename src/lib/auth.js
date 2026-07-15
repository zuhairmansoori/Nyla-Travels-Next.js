import { betterAuth } from "better-auth";
import connectDB from "./MongoDB";
import mongoose from "mongoose";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
await connectDB()
console.log('db was connected')
const client = mongoose.connection.getClient()
console.log(client.db().databaseName);
export const auth = betterAuth({
    database:mongodbAdapter(client.db()),
    baseURL:process.env.BETTER_AUTH_URL,
    secret:process.env.BETTER_AUTH_SECRET,
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
    }
}
)