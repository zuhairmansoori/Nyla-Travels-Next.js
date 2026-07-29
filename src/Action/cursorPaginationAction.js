"use server";

import connectDB from "@/lib/MongoDB";
import activityModel from "@/model/activityModel";
import mongoose from "mongoose";

export async function getActivities(cursor,search) {
  await connectDB();

  let query = {
    isActive: true,
  };

  if(search?.trim()){
    const word = search.trim().split(/\s+/)

    query = {
      isActive:true,
      $and: word.map((word)=>({
        $or:[
          {title:{$regex: word, $options:"i"}},
          {destination:{$regex:word,$options:"i"}}
        ]
      }))
    }
  }

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