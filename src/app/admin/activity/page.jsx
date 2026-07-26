

import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import ActivityTable from "@/components/admin/activitys/ActivtyTable";
import Link from "next/link";

export default async function page() {
    await connectDB();
    const activities = await activityModel.find().sort({ createdAt: -1 }).lean();

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
                <Link
                    href="/admin/activity/addActivity"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                    + Add Activity
                </Link>
            </div>

            <ActivityTable activities={JSON.parse(JSON.stringify(activities))} />
        </div>
    );
}