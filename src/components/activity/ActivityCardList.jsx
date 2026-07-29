'use client'
import React, { useEffect, useState } from 'react'
import ActivityCard from './ActivityCard'
import CursorPagination from '../paginations/CursorPagination'
function ActivityCardList({data, search}) {
    const [activities ,setActivities] = useState(data)
     useEffect(() => {
    setActivities(data);
  }, [data]); 
  return (
   <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <ActivityCard
            key={activity._id.toString()}
            activity={activity}
          />
        ))}
      </div>
      <CursorPagination cursor={activities.at(-1)?._id} loadMore={(newData) =>
          setActivities((prev) => [...prev, ...newData])} search={search}/>
    </div>
  )
}

export default ActivityCardList
