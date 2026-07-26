"use server";

import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import {cloud} from '@/lib/cludinary'
import { revalidatePath } from "next/cache";



function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function uploadSingleFile(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloud.uploader.upload_stream(
            { folder: "nyla-travels/activities" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
}

// ==================== CREATE ====================
export async function createActivity(prevState, formData) {
    try {
        await connectDB();

        const title = formData.get("title")?.trim();
        const destination = formData.get("destination")?.trim();
        const category = formData.get("category")?.trim();
        const description = formData.get("description")?.trim();
        const duration = formData.get("duration")?.trim();
        const price = Number(formData.get("price"));
        const meetingPoint = formData.get("meetingPoint")?.trim();
        const isActive = formData.get("isActive") === "true";

        const highlights = JSON.parse(formData.get("highlights") || "[]");
        const included = JSON.parse(formData.get("included") || "[]");
        const excluded = JSON.parse(formData.get("excluded") || "[]");
        const timings = JSON.parse(formData.get("timings") || "[]");

        const files = formData.getAll("images").filter((f) => f && typeof f !== "string" && f.size > 0);

        if (!title || !destination || !category || !description || !duration || !price) {
            return { success: false, message: "Please fill all required fields." };
        }

        if (files.length === 0) {
            return { success: false, message: "Please select at least one image." };
        }

        const uploadResults = await Promise.allSettled(
            files.map(async (file) => {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const result = await uploadSingleFile(buffer);
                return { url: result.secure_url, publicId: result.public_id };
            })
        );

        const successfulUploads = uploadResults
            .filter((r) => r.status === "fulfilled")
            .map((r) => r.value);

        const failedCount = uploadResults.length - successfulUploads.length;

        if (successfulUploads.length === 0) {
            return { success: false, message: "Image upload failed. Please try again." };
        }

        let slug = generateSlug(title);
        const existing = await activityModel.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const activity = await activityModel.create({
            title,
            slug,
            destination,
            category,
            description,
            duration,
            price,
            images: successfulUploads,
            highlights: highlights.filter((h) => h.trim() !== ""),
            included: included.filter((i) => i.trim() !== ""),
            excluded: excluded.filter((e) => e.trim() !== ""),
            meetingPoint,
            timings: timings.filter((t) => t.trim() !== ""),
            isActive,
        });

        revalidatePath("/admin/activities");

        return {
            success: true,
            message:
                failedCount > 0
                    ? `Activity created, but ${failedCount} image(s) failed to upload.`
                    : "Activity created successfully!",
            id: activity._id.toString(),
        };
    } catch (error) {
        console.error("Create activity error:", error);
        if (error.code === 11000) {
            return { success: false, message: "An activity with this title already exists." };
        }
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

// ==================== UPDATE ====================
export async function updateActivity(id, prevState, formData) {
    try {
        await connectDB();

        const title = formData.get("title")?.trim();
        const destination = formData.get("destination")?.trim();
        const category = formData.get("category")?.trim();
        const description = formData.get("description")?.trim();
        const duration = formData.get("duration")?.trim();
        const price = Number(formData.get("price"));
        const meetingPoint = formData.get("meetingPoint")?.trim();
        const isActive = formData.get("isActive") === "true";

        const highlights = JSON.parse(formData.get("highlights") || "[]");
        const included = JSON.parse(formData.get("included") || "[]");
        const excluded = JSON.parse(formData.get("excluded") || "[]");
        const timings = JSON.parse(formData.get("timings") || "[]");

        // Images jo already Cloudinary pe hain aur user ne rakhi hain — as-is jaayengi
        const existingImages = JSON.parse(formData.get("existingImages") || "[]");

        // Sirf ye naye files upload honge
        const newFiles = formData.getAll("newImages").filter((f) => f && typeof f !== "string" && f.size > 0);

        if (!title || !destination || !category || !description || !duration || !price) {
            return { success: false, message: "Please fill all required fields." };
        }

        let newlyUploaded = [];
        if (newFiles.length > 0) {
            const uploadResults = await Promise.allSettled(
                newFiles.map(async (file) => {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    const result = await uploadSingleFile(buffer);
                    return { url: result.secure_url, publicId: result.public_id };
                })
            );
            newlyUploaded = uploadResults
                .filter((r) => r.status === "fulfilled")
                .map((r) => r.value);
        }

        const finalImages = [...existingImages, ...newlyUploaded];

        if (finalImages.length === 0) {
            return { success: false, message: "Activity must have at least one image." };
        }

        let slug;
        const currentActivity = await activityModel.findById(id);
        if (currentActivity && currentActivity.title !== title) {
            slug = generateSlug(title);
            const clashing = await activityModel.findOne({ slug, _id: { $ne: id } });
            if (clashing) {
                slug = `${slug}-${Date.now()}`;
            }
        }

        await activityModel.findByIdAndUpdate(id, {
            title,
            ...(slug && { slug }),
            destination,
            category,
            description,
            duration,
            price,
            images: finalImages,
            highlights: highlights.filter((h) => h.trim() !== ""),
            included: included.filter((i) => i.trim() !== ""),
            excluded: excluded.filter((e) => e.trim() !== ""),
            meetingPoint,
            timings: timings.filter((t) => t.trim() !== ""),
            isActive,
        });

        revalidatePath("/admin/activities");

        return { success: true, message: "Activity updated successfully!" };
    } catch (error) {
        console.error("Update activity error:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

// ==================== DELETE SINGLE IMAGE (X button on existing images) ====================
export async function deleteActivityImage(publicId) {
    try {
        await cloud.uploader.destroy(publicId);
        return { success: true };
    } catch (error) {
        console.error("Delete image error:", error);
        return { success: false, message: "Failed to delete image" };
    }
}

// ==================== DELETE WHOLE ACTIVITY ====================
export async function deleteActivity(id) {
    try {
        await connectDB();
        const activity = await activityModel.findById(id);
        if (!activity) return { success: false, message: "Activity not found" };

        if (activity.images?.length > 0) {
            await Promise.allSettled(
                activity.images.map((img) => cloud.uploader.destroy(img.publicId))
            );
        }

        await activityModel.findByIdAndDelete(id);
        revalidatePath("/admin/activities");

        return { success: true };
    } catch (error) {
        console.error("Delete activity error:", error);
        return { success: false, message: "Failed to delete activity" };
    }
}