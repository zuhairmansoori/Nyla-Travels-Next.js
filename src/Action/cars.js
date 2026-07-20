'use server'
import connectDB from "@/lib/MongoDB";
import carModel from "@/model/carModel";
import {cloud} from  '@/lib/cludinary'
import { revalidatePath } from "next/cache";
import { success } from "better-auth";




async function uploadImageToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      { folder: "Nyla-Cars",
        format: "webp",
       }, // apna folder naam yahan set kar sakte ho
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

}
async function deleteImageFromCloudinary(publicId) {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('deleteImageFromCloudinary error:', error)
  }
}
 
export async function carAction(formData) {
  try {
    await connectDB() // sabse pehle DB connect karo

    const id = formData.get('id')

    const carName = formData.get('CarName')
    const doors = formData.get('Doors')
    const fuelType = formData.get('FuelType')
    const deposit = formData.get('Deposit')

    const rentDayPrice = formData.get('RentdayPrice')
    const rentDayKm = formData.get('RentdayKm')

    const rentWeekPrice = formData.get('RentweekPrice')
    const rentWeekKm = formData.get('RentweekKm')

    const carModelYear = formData.get('Carmodel')
    const airbag = formData.get('Airbag')
    const transmission = formData.get('Transmission')
    const passengers = formData.get('Passengers')

    const imageFile = formData.get('image')

    // required fields ki basic validation
    if (
      !carName ||
      !doors ||
      !deposit ||
      !rentDayPrice ||
      !rentDayKm ||
      !rentWeekPrice ||
      !rentWeekKm
    ) {
      return {
        success: false,
        message: 'Required fields missing hain. Sab zaroori fields bharo.',
      }
    }

    const carData = {
      CarName: carName,
      Doors: Number(doors),
      FuelType: fuelType || undefined,
      Deposit: Number(deposit),
      Rentday: {
        price: Number(rentDayPrice),
        Km: Number(rentDayKm),
      },
      Rentweek: {
        price: Number(rentWeekPrice),
        Km: Number(rentWeekKm),
      },
      Carmodel: carModelYear ? Number(carModelYear) : undefined,
      Airbag: airbag ? Number(airbag) : undefined,
      Transmission: transmission || undefined,
      Passengers: passengers ? Number(passengers) : undefined,
    }

    // ----- EDIT -----
    if (id) {
      const existingCar = await carModel.findById(id)
      if (!existingCar) {
        return { success: false, message: 'Car nahi mili.' }
      }

      // agar nayi image upload hui hai to purani delete karke nayi lagao
      if (imageFile && imageFile.size > 0) {
        await deleteImageFromCloudinary(existingCar.imageUrl?.publib_id)
        const uploadResult = await uploadImageToCloudinary(imageFile)
        carData.imageUrl = {
          url: uploadResult.secure_url,
          publib_id: uploadResult.public_id,
        }
      }

      await carModel.findByIdAndUpdate(id, carData)
      revalidatePath('/cars') // apna actual listing page path daalo

      return { success: true, message: 'Car successfully update ho gayi!' }
    }

    // ----- CREATE -----
    if (!imageFile || imageFile.size === 0) {
      return { success: false, message: 'Car image zaroori hai.' }
    }

    const uploadResult = await uploadImageToCloudinary(imageFile)
    carData.imageUrl = {
      url: uploadResult.secure_url,
      publib_id: uploadResult.public_id, // schema mein yehi spelling hai (publib_id)
    }

    const newCar = new carModel(carData)
    await newCar.save()

    revalidatePath('/cars') // apna actual listing page path daalo

    return { success: true, message: 'Car successfully add ho gayi!' }
  } catch (error) {
    console.error('carAction error:', error)
    return {
      success: false,
      message: error?.message || 'Kuch galat ho gaya, dobara try karo.',
    }
  }
}

export async function deleteCarAction(id) {
    try {
        await connectDB()
         const deleteCar = await carModel.findByIdAndDelete(id)
         const public_id = deleteCar.imageUrl.public_id
         const deleteImage = await deleteImageFromCloudinary(public_id)
         return{
            success:true,message:"car is deleted"
         }
    } catch (error) {
        return {
      success: false,
      message: error?.message || 'Kuch galat ho gaya, dobara try karo.',
    }
    }
    
}