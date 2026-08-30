
import mongoose from "mongoose";
export const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    doors: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fuelType: String,
    deposit: {
        type: Number,
        required: true
    },
    rentDay: {
        price: {
            type: Number,
            required: true
        },
        km: {
            type: Number,
            required: true
        }
    },
    categorie: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true
    },
    features: [
        {
            type: String,
        }
    ],
    rentWeek: {
        price: {
            type: Number,
            required: true
        },
        km: {
            type: Number,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    carModel: Number,
    airbag: Number,
    transmission: String,
    passengers: Number,
    isActive: Boolean,
    imageUrl: [
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

const carModel = mongoose.models.Cars || mongoose.model('Cars', carSchema)

export default carModel