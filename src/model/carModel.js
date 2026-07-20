
import mongoose from "mongoose";
export const carSchema = new mongoose.Schema({
    CarName: {
        type: String,
        required: true
    },
    Doors: {
        type: Number,
        required: true
    },
    FuelType: String,
    Deposit: {
        type: Number,
        required: true
    },
    Rentday: {
        price: {
            type: Number,
            required: true
        },
        Km: {
            type: Number,
            required: true
        }
    },
    Rentweek: {
        price: {
            type: Number,
            required: true
        },
        Km: {
            type: Number,
            required: true
        }
    },
    Carmodel:Number,
    Airbag:Number,
    Transmission:String,
    Passengers:Number,
    imageUrl:{
        url:{
            type:String,
            required:true
        },
        publib_id:{
            type:String,
            required:true
        }
    }
})

const carModel = mongoose.models.Cars || mongoose.model('Cars',carSchema)

export default carModel