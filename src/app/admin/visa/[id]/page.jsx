import { updateVisa } from "@/Action/visa";
import FormVisa from "@/components/admin/visa/FormVisa";
import connectDB from "@/lib/MongoDB";
import visaModel from "@/model/visa";

export default async function Pgae({params}){
    await connectDB()
    const {id} =  await params
    console.log('id param', id)
    const visa = await visaModel.findById(id)
    const data = JSON.parse(JSON.stringify(visa));
    console.log('visa', data);
    return(
        <>
        <FormVisa action={updateVisa} Defaultlvalue={data} />
        </>
    )
    
}