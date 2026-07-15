import VisaCard from "@/components/visa/VisaCard"
import connectDB from "@/lib/MongoDB"
import visaModel from "@/model/visa"

export default async function page() {
  await connectDB()
  const visaData = await visaModel.find().lean()

  // Serialize karo before passing to props for props
const plainVisas = JSON.parse(JSON.stringify(visaData));
console.log(plainVisas)

  return (
    <>
      <VisaCard visaDatas={plainVisas} />
    </>
  )
}