'use server'
import {cloud} from '@/lib/cludinary'
import visaModel from '@/model/visa'
import connectDB from "@/lib/MongoDB"
import { success } from 'better-auth'

export async function visaImage(formdata){
    await connectDB()
    const image = formdata.get('image')
    if(!image || image.size === 0){
        return {error :"No Image Upload"}
    };
    try {
        const bytes = await image.arrayBuffer()
        console.log("bytes",bytes)
        const buffer = Buffer.from(bytes)
        const result = await new Promise((res,rej)=>{
           const uploadImage = cloud.uploader.upload_stream(
            {folder : 'NYLA-TRAVELS',
             format: "webp",
            },(error, data)=>{
                if(error) rej(error)
                 else res(data)
            }
           );
           uploadImage.end(buffer);
        })
        console.log(result);
        return{success: true, message:"image uploded successfully" }

    } catch (error) {
        console.log(error);
        return{success: false, message:"Something went wrong" }
    }
}