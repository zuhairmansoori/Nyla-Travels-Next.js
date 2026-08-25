'use server'
import connectDB from "@/lib/MongoDB";
import carModel from "@/model/carModel";
import { cloud } from '@/lib/cludinary'
import { revalidatePath } from "next/cache";
import { success } from "better-auth";
import { title } from "motion/react-client";




async function uploadImageToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      {
        folder: "Nyla-Travels/Cars",
        format: "webp",
      }, // apna folder naam yahan set kar sakte ho
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

};

function generateSlug(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

// ==================== DELETE SINGLE IMAGE (X button on existing images) ====================

export async function deleteImageFromCloudinary(publicId) {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('deleteImageFromCloudinary error:', error);
    return { success: false, message: "Failed to delete image" };

  }
}

export async function craertCar(formData) {
  try {
    await connectDB() // sabse pehle DB connect karo
  
   
    const carName = formData.get('carName')
    const doors = formData.get('doors')
    const fuelType = formData.get('fuelType')
    const deposit = formData.get('deposit')
    const description = formData.get('description')

    const rentDay = JSON.parse(formData.get("rentDay"))
    const rentWeek = JSON.parse(formData.get('rentWeek'))
    const isActive = formData.get('isActive') === 'true';

    const carModelYear = formData.get('carModel')
    const airbag = formData.get('airbag')
    const transmission = formData.get('transmission')
    const passengers = formData.get('passengers')

    const files = formData.getAll('images').filter((f) => f && typeof f !== "string" && f.size > 0);

  
    // required fields ki basic validation
    if (
      !carName ||
      !doors ||
      !deposit ||
      !rentDay ||
      !rentWeek ||
      !carModelYear ||
      !airbag ||
      !transmission ||
      !passengers ||
      !fuelType

    ) {
      return {
        success: false,
        message: 'Required fields missing hain. Sab zaroori fields bharo.',
      }
    }

    if (files.length === 0) {
      return { success: false, message: "Please select at least one image." };
    }

    const uploadResult = await  Promise.allSettled(
      files.map(async (file) => {
        const result = await uploadImageToCloudinary(file)
        return {
          url: result.secure_url,
          public_id: result.public_id
        }
      })
    );

    
    const successfullyUploads = uploadResult
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value)

    const failedCount = uploadResult.length - successfullyUploads.length
    if (successfullyUploads.length === 0) {
      return { success: false, message: "Image upload failed. Please try again." };
    }

    let slug = generateSlug(carName)
    const existing = await carModel.findOne( { slug } );
    if(existing){
      slug = `${slug}-${Date.now()}`;
    };

    const car = await carModel.create({

      carName,
      "carModel": carModelYear,
      description,
      deposit,
      transmission,
      airbag,
      passengers,
      imageUrl:successfullyUploads,
      rentDay,
      rentWeek,
      fuelType,
      slug,
      doors,
      isActive

    })
  
    revalidatePath('/cars') // apna actual listing page path daalo

       return {
            success: true,
            message:
                failedCount > 0
                    ? `Activity created, but ${failedCount} image(s) failed to upload.`
                    : "Activity created successfully!",
            id: car._id.toString(),
        };
  } catch (error) {
    console.error('Create car error:', error)
    if (error.code === 11000) {
            return { success: false, message: "An activity with this title already exists." };
        }
        return { success: false, message: "Something went wrong. Please try again." };
  }
}

//============================update car============================
 export async function upadateCar(id,formData){
  try {
    await connectDB() // sabse pehle DB connect karo

    const carName = formData.get('carName')
    const doors = formData.get('doors')
    const fuelType = formData.get('fuelType')
    const deposit = formData.get('deposit')
    const description = formData.get('description')

    const rentDay = JSON.parse(formData.get("rentDay"))
    const rentWeek = JSON.parse(formData.get('rentWeek'))

    const carModelYear = formData.get('carModel')
    const airbag = formData.get('airbag')
    const transmission = formData.get('transmission')
    const passengers = formData.get('passengers')
    const isActive = formData.get('isActive') === 'true';
    
    const existingImages = JSON.parse(formData.get("existingImages" || "[]"))
    const newfiles = formData.getAll('images').filter((f) => f && typeof f !== "string" && f.size > 0);

    // required fields ki basic validation
    if (
      !carName ||
      !doors ||
      !deposit ||
      !rentDay ||
      !rentWeek ||
      !carModelYear ||
      !airbag ||
      !transmission ||
      !passengers ||
      !fuelType

    ) {
      return {
        success: false,
        message: 'Required fields missing hain. Sab zaroori fields bharo.',
      }
    }
    let newlyUploaded = [];
    if(newfiles.length >0) {
      const uploadResult = await Promise.allSettled(
        newfiles.map(async (img)=>{
          const result = await uploadImageToCloudinary(img)
          return { url: result.secure_url, publicId: result.public_id };
        })
      )
      newlyUploaded = uploadResult
      .filter((r)=> r.status === "fulfilled")
      .map((r)=> r.value)
    }

    const finalImages = [...existingImages, ...newlyUploaded]

        if (finalImages.length === 0) {
            return { success: false, message: "Activity must have at least one image." };
        }

        let slug;
        const curenrtCar = await carModel.findById(id)
        if(curenrtCar && curenrtCar.carName !== carName){
          slug = generateSlug(carName);
          const clashing = await carModel.findOne({slug,_id:{$ne:id}})
          if(clashing){
            slug = `${slug}-${Date.now()}`
          }
        }
         await carModel.findByIdAndUpdate(id,{

      carName,
      ...(slug && {slug}),
     "carModel":carModelYear,
      description,
      deposit,
      transmission,
      airbag,
      passengers,
      imageUrl:finalImages,
      rentDay,
      rentWeek,
      fuelType,
      doors,
      isActive


    })
  
    revalidatePath('/cars') // apna actual listing page path daalo


    return {success : true,message: "Car updated successfully!"}

  } catch (error) {
      console.error("Update activity error:", error);
        return { success: false, message: "Something went wrong. Please try again." };
  }
 }


export async function deleteCarAction(id) {
  try {
    await connectDB()
    const deleteCar = await carModel.findByIdAndDelete(id)
    if(!deleteCar) return {success:false, message :"Car not found"}
    const public_id = deleteCar.imageUrl.public_id
    if(deleteCar.imageUrl?.length > 0){
         await Promise.allSettled(
          deleteCar.map( (img)=> deleteImageFromCloudinary(img.public_id) )
         ) 
    }
      revalidatePath('/cars')
    return {
      success: true, message: "car is deleted"
    }
  } catch (error) {
    console.error("Delete car error", error)
    return {
      success: false,
      message: error?.message || 'Failed to delete car, plese try again.',
    }
  }

}