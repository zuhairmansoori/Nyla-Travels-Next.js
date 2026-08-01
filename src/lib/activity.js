import connectDB from "@/lib/MongoDB"
import activityModel from "@/model/activityModel"

export async function getActivityBySlug(slug) {
  try {
    await connectDB()
    const activity = await activityModel.findOne({ slug }).lean()
    return activity
  } catch (error) {
    console.error("Error fetching activity by slug:", error)
    return null
  }
}