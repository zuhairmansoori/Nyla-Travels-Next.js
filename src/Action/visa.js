'use server'
import { cloud } from '@/lib/cludinary'
import visaModel from '@/model/visa'
import connectDB from "@/lib/MongoDB"
import { revalidatePath } from 'next/cache'
import { success } from 'better-auth'

export async function createVisa(formdata) {
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
        model.imageUrl = { url: result.secure_url, public_id: result.public_id }
        const upload = await visaModel.create(model)
        revalidatePath("/admin/visa");
        revalidatePath("/visa");
        console.log(result, "and model", upload);
        return { success: true, message: "Visa Details uploded successfully" }

    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }
    }
}

export async function updateVisa(formdata) {
    try {
        await connectDB()
        const image = formdata.get('image')

        const id = formdata.get('id')

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
        };
        const visa = await visaModel.findById(id)
        if (!visa) {
            return {
                success: false,
                message: "Visa not found",
            };
        }

        if (image && image.size > 0) {
            await cloud.uploader.destroy(visa.imageUrl.public_id)

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
            console.log(result)
            model.imageUrl = { url: result.secure_url, public_id: result.public_id }
        };


        const upload = await visaModel.findByIdAndUpdate(id, model, {
            new: true,
            runValidators: true,
        })
        revalidatePath("/admin/visa");
        revalidatePath("/visa");
        console.log(upload);
        return { success: true, message: "Visa Details uploded successfully" }

    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }
    }
}


export async function DeleteVisa({ id }) {
    try {
        await connectDB()
        const visa = await visaModel.findByIdAndUpdate(id)
        if (!visa) {
            return {
                success: false,
                message: "visa not found"
            }
        }
        if (visa?.imageUrl?.public_id) {
            await cloud.uploader.destroy(visa.imageUrl.public_id)
        }
        console.log('deleted visa', visa);
        return {
            success: true,
            message: "visa is deleted sucssesfully"
        }
        revalidatePath("/admin/visa");
        revalidatePath("/visa");


    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" }

    }
}