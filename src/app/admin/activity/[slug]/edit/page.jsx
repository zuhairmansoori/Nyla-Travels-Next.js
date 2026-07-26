import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import ActivityForm from "@/components/admin/activitys/ActivityForm";
import { notFound } from "next/navigation";

export default async function EditActivityPage({ params }) {
    await connectDB();
  
    const {slug} =  await params
    console.log('slug',slug);
    

    const activity = await activityModel.findOne({ slug: slug }).lean();
    console.log('activity',activity);
    

    // if (!activity) {
    //     notFound();
    // }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Activity</h1>
            <ActivityForm activity={JSON.parse(JSON.stringify(activity))} />
        </div>
    );
}