"use server";

import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import mongoose from "mongoose";

export async function getActivities(cursor) {
  await connectDB();

  const query = {
    isActive: true,
  };

  if (cursor) {
    query._id = {
      $lt: new mongoose.Types.ObjectId(cursor),
    };
  }

  const activities = await activityModel
    .find(query)
    .sort({ _id: -1 })
    .limit(12)
    .lean();

  return JSON.parse(JSON.stringify(activities));
}