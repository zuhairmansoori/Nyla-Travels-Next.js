import mongoose from "mongoose";

const visaSchema = new mongoose.Schema({
    country:{
        type:String,
        required:true,
        trim:true
    },
    visaType:{
         type:[String],
        required:true,
        trim:true
    },
    imageUrl:{
        url:{
        type:String,
        required:true
        },
        public_id:{
             type:String,
        required:true
        }
    },
    validity:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    documents:{
        type:[String]
    },
    lengthOfStay:{
        type:String
    },
    description:{
        type:String,
        default:''
    },
    entry:{
        type:String
    },
    variant:[String],
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const visaModel = mongoose.models.Visa || mongoose.model('Visa',visaSchema)

export default visaModel