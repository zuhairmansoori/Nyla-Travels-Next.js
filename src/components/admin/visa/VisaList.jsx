
import VisaCard from "@/components/visa/VisaCard"
import connectDB from "@/lib/MongoDB"
import visaModel from "@/model/visa"


export default async function VisaList({search}) {
  await connectDB()
  const query = search
    ? {
        country: {
          $regex: search,
          $options: "i",
        },
      }
    : {};
  const visaData = await visaModel.find(query).lean()

  // Serialize karo before passing to props for props
const plainVisas = JSON.parse(JSON.stringify(visaData));
console.log(plainVisas)

  return (
    <>
      <VisaCard visaDatas={plainVisas} />;
     
    </>
  )
}