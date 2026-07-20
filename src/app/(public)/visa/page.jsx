import SearchInput from "@/components/admin/SearchInput"
import VisaList from "@/components/admin/visa/VisaList"
import SkeletonLoader from "@/components/SkeletonLoader"
import {Suspense} from 'react'

export default async function page({searchParams}) {
  const param = await searchParams
  const search = param.search || ''
  

 

  return (
    <>
     <SearchInput divClassName={'lg:w-3/5 m-auto'}/>
      <Suspense key={search} fallback={<SkeletonLoader cardClassName="w-72" gridClassName={'lg:grid-cols-4 max-w-7xl m-auto'} count={'12'} />}>
                <VisaList search={search}/>
           
      </Suspense>
 
    </>
  )
}