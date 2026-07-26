"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteActivity } from "@/Action/activity";
import Image from "next/image";

export default function ActivityTable({ activities }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [confirmId, setConfirmId] = useState(null);

    const handleDelete = (id) => {
        startTransition(async () => {
            const result = await deleteActivity(id);
            if (result.success) {
                setConfirmId(null);
                router.refresh();
            }
        });
    };

    if (activities.length === 0) {
        return (
            <p className="text-sm text-gray-500 text-center py-16">
                No activities yet. Click &quot;Add Activity&quot; to create one.
            </p>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left font-medium text-gray-500 px-4 py-3">Image</th>
                            <th className="text-left font-medium text-gray-500 px-4 py-3">Title</th>
                            <th className="text-left font-medium text-gray-500 px-4 py-3">Destination</th>
                            <th className="text-left font-medium text-gray-500 px-4 py-3">Category</th>
                            <th className="text-left font-medium text-gray-500 px-4 py-3">Duration</th>
                            <th className="text-right font-medium text-gray-500 px-4 py-3">Price</th>
                            <th className="text-center font-medium text-gray-500 px-4 py-3">Status</th>
                            <th className="text-right font-medium text-gray-500 px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {activities.map((activity) => (
                            <tr key={activity._id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                        {activity.images?.[0]?.url ? (
                                            <Image
                                                src={activity.images[0].url}
                                                alt={activity.title}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                                                No img
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-gray-900 max-w-[220px] truncate">
                                        {activity.title}
                                    </p>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{activity.destination}</td>
                                <td className="px-4 py-3 text-gray-600">{activity.category}</td>
                                <td className="px-4 py-3 text-gray-600">{activity.duration}</td>
                                <td className="px-4 py-3 text-right font-medium text-gray-900">
                                    INR {activity.price?.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                            activity.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-600"
                                        }`}
                                    >
                                        {activity.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => router.push(`/admin/activity/${activity.slug}/edit`)}
                                            className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setConfirmId(activity._id)}
                                            className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete confirmation modal */}
            {confirmId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-5 max-w-sm w-full space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900">Delete this activity?</h4>
                        <p className="text-xs text-gray-500">
                            This action cannot be undone. All images will also be removed.
                        </p>
                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={() => setConfirmId(null)}
                                disabled={isPending}
                                className="flex-1 py-2 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(confirmId)}
                                disabled={isPending}
                                className="flex-1 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}