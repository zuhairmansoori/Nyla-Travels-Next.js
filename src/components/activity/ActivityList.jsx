import React from 'react'
import connectDB from "@/lib/MongoDB";
import ActivityCardList from './ActivityCardList';
import { getActivities } from '@/Action/cursorPaginationAction';
async function ActivityList({search}) {
  await connectDB()
  const activities = await getActivities(null,search)
  console.log("Search:", search);
// console.log("Query:", JSON.stringify(query, null, 2));
console.log("Titles:", activities.map(a => a.title));
  const data = JSON.parse(JSON.stringify(activities))

  return (
    <>
    <ActivityCardList data={data} search={search} />
    </>
  )
}

export default ActivityList
