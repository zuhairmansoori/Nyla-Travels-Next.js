
import CarList from "@/components/car/CarList"
import { SearchIcon } from "lucide-react"
import SkeletonLoader from "@/components/SkeletonLoader"
import { Suspense } from "react"
import SearchInput from "@/components/admin/SearchInput"

async function page({searchParams}) {
  const params = await searchParams
  return (
    <div>
      <SearchInput  divClassName={'lg:w-3/5 m-auto'} />
      <Suspense fallback={<SkeletonLoader gridClassName={'lg:grid-cols-3 max-w-7xl m-auto'} count={'12'} />}>
         <CarList params={params} />
      </Suspense>
   
    </div>
  )
}

export default page
