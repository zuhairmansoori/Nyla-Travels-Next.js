import { updateVisa } from "@/Action/visa";
import FormVisa from "@/components/admin/visa/FormVisa";
import connectDB from "@/lib/MongoDB";
import visaModel from "@/model/visa";

export default async function Pgae({params}){
    await connectDB()
    const {id} =  await params
    console.log('id param', id)
    const visa = await visaModel.findById(id)
    console.log('visa', visa);
    return(
        <>
        <FormVisa action={updateVisa} Defaultlvalue={visa} />
        </>
    )
    
}