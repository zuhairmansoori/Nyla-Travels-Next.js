import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        destination: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        duration: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                    required: true,
                },
            },
        ],

        highlights: [
            {
                type: String,
            },
        ],

        included: [
            {
                type: String,
            },
        ],

        excluded: [
            {
                type: String,
            },
        ],

        meetingPoint: {
            type: String,
        },

        timings: [
            {
                type: String,
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Activity ||
    mongoose.model("Activity", activitySchema);