
import { Suspense } from "react";
import ActivityList from "@/components/activity/ActivityList";
import SkeletonLoader from "@/components/SkeletonLoader";
import SearchInput from "@/components/admin/SearchInput";
import { div } from "motion/react-client";

export default async function ActivitiesPage({searchParams}) {
   const params = await searchParams
   const search = params.search
   console.log('page search',search);
   

   
    return (
        <div className=" py-5">
            <SearchInput pagination={"cursor"}/>
        <div className=" px-4 py-10" >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Explore Our Activities
            </h2>
            <p className="text-gray-500 text-center mb-10">
                Handpicked experiences for your next trip.
            </p>
             
             <div>
                <Suspense key={search} fallback={<SkeletonLoader gridClassName={' max-w-7xl m-auto '} count={'12'} /> }  >
                 <ActivityList search={search} />
                </Suspense>
             </div>
           
        </div>
        </div>
    );
}