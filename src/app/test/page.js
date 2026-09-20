import PaymentCancellation from "@/components/payment/PaymentCancellation"
import PaymentVerification from "@/components/payment/PaymentVerification"
import NotFound from "../not-found"
import connectDB from "@/lib/MongoDB"
import Booking from "@/model/bookingModel"


async function page({searchParams}) {
  const param = await searchParams
  console.log(param.id)
if(!param.id){
  console.log('param not found')
  return <NotFound/>
}  
await connectDB()
const booking = await Booking.findById(param.id)
if(!booking){
  return <PaymentCancellation error={"Booking not found"}/>
}
if(booking.paymentStatus === 'faield'){
  return <PaymentCancellation orderId={booking.razorpay.orderId} />
}

  return (
    <div>
      <PaymentVerification orderId={booking.razorpay.orderId} paymentId={booking.razorpay.paymentId}/> 
    
    </div>
  )
}

export default page
