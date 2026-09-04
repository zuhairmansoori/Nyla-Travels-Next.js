import connectDB from "./MongoDB";
import carModel from "@/model/carModel";

export async function getCarBySlug(slug){
    try{
        await connectDB();
        const cars = await carModel.findOne({slug}).lean();
        return cars
    }catch(error){

        console.error("Error fetching car by slug:", error);
        return null;
    }
}