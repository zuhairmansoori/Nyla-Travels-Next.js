import Link from 'next/link'
import React from 'react'

function OffSetPagination({ page, totalPage, basePath, }) {
    return (
        <div className="flex gap-2 mt-6" >
            {page > 1 && (
                <Link href={`${basePath}?page=${page - 1}`} >Prev</Link>
            )}
            {Array.from({ length: totalPage }, (_, i) => (
                <Link key={i} href={`${basePath}?page=${i + 1}`} className={
                    page === i + 1
                        ? "font-bold text-blue-600"
                        : ""
                } >
                    {i+1}
                </Link>
            ))}

            {page < totalPage && (
                <Link href={`${basePath}?page=${page+1}`} > Next</Link>
            )}
        </div>
    )
}

export default OffSetPagination
