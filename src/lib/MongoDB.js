
import mongoose from "mongoose";

const URI = process.env.MONGODB_URI

let cached = global.Mongoose|| {conn :null,promise:null}


export default async function connectDB(){
    try {
        if(cached.conn) return cached.conn
    if(!cached.promise){
        cached.promise = mongoose.connect(URI)
        console.log('db is connected')
    }
    cached.conn = await cached.promise
    global.mongoose = cached;
    return cached.conn
    } catch (error) {
        console.log(error);
        
    }
    
}