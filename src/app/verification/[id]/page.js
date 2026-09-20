
import PaymentCancellation from "@/components/payment/PaymentCancellation"
import PaymentVerification from "@/components/payment/PaymentVerification"
import NotFound from "../../not-found"
import connectDB from "@/lib/MongoDB"
import Booking from "@/model/bookingModel"



async function page({params}) {
  const {id} = await params
if(!id){
  console.log('param not found')
  return <NotFound/>
}  
try{
await connectDB()
const booking = await Booking.findById(id)
if(!booking){
  return <NotFound/>
}
if(booking.paymentStatus === 'failed'){
  return <PaymentCancellation orderId={booking.razorpay.orderId} bookingNumber={booking.bookingNumber} />
}
if(booking.paymentStatus === 'paid'){
    return (
    <div>
      <PaymentVerification orderId={booking.razorpay.orderId} paymentId={booking.razorpay.paymentId} bookingNumber={booking.bookingNumber}/> 
    
    </div>
  )
}
}catch(error){
  console.error('somting went erong',error)
  return <NotFound/>
}
}

export default page




