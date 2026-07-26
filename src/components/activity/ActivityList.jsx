import React from 'react'
import connectDB from "@/lib/MongoDB";
import ActivityCardList from './ActivityCardList';
import { getActivities } from '@/Action/cursorPaginationAction';
async function ActivityList() {
  await connectDB()
  const activities = await getActivities()
  const data = JSON.parse(JSON.stringify(activities))

  return (
    <>
    <ActivityCardList data={data}/>
    </>
  )
}

export default ActivityList
