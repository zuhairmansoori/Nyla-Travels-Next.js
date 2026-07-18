
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/MongoDB";
import visaModel from "@/model/visa";
import Link from "next/link";

export default async function Pgae(){
    await connectDB()
    const {id} =  await params
    console.log('id param', id)
    const visa = await visaModel.find()
    console.log('visa', visa);
    return(
        <>
         <section>
            <div>
                <Link href={`/visa/addVisa`} >
                <Button>+Add Visa </Button>
                </Link>
            </div>
         </section>
        </>
    )
    
}