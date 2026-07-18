import { createVisa } from "@/Action/visa";
import FormVisa from "@/components/admin/visa/FormVisa";

export default function Page(){
    return(
        <>
        <FormVisa action={createVisa} />
        </>
    )
}