'use server'
import { cloud } from '@/lib/cludinary'
import visaModel from '@/model/visa'
import connectDB from "@/lib/MongoDB"
import { success } from 'better-auth'

export async function visaImage(formdata) {
    await connectDB()
    const image = formdata.get('image')


    const model = {
        country: formdata.get('country'),
        visaType: formdata.get('visaType')?.toString().split(',').map(itm => itm.trim()),
        validity: formdata.get('validity'),
        price: +formdata.get('price'),
        documents: formdata.get('documents')?.toString().split(',').map(itm => itm.trim()),
        lengthOfStay: formdata.get('lengthOfStay'),
        description: formdata.get('description'),
        entry: formdata.get('entry'),
        variant: formdata.get('variant'),
        isActive: formdata.get('isActive') === 'true',
    }

    if (!image || image.size === 0) {
        return { error: "No Image Upload" }
    };
    try {
        const bytes = await image.arrayBuffer()
        console.log("bytes", bytes)
        const buffer = Buffer.from(bytes)
        const result = await new Promise((res, rej) => {
            const uploadImage = cloud.uploader.upload_stream(
                {
                    folder: 'NYLA-TRAVELS',
                    format: "webp",
                }, (error, data) => {
                    if (error) rej(error)
                    else res(data)
                }
            );
            uploadImage.end(buffer);
        })
        model.imageUrl=result.secure_url
        const upload = await visaModel.create(model)

        console.log(result,"and model",upload);
        return { success: true, message: "Visa Details uploded successfully" }

    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }
    }
}