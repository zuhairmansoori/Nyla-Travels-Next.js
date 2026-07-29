'use client'
import React, { useEffect, useRef } from 'react'
import { getActivities } from '@/Action/cursorPaginationAction'
function CursorPagination({ cursor, loadMore, search }) {
  const ref = useRef()
  useEffect(() => {

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;

      const data = await getActivities(cursor, search)
      if (data.length === 0) {
        observer.disconnect();
        return;
      }
      loadMore(data);

    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [cursor, search])

  return (
    <div ref={ref} className='h-10' >

    </div>
  )
}

export default CursorPagination
