

export default function optionHandler(order,booking_id,router){
    // Rzorpay options
    const options={
        key:process.env.RAZORPAY_API_KEY,
        amount:order.amount,
        currency:"INR",
        order_id:order.id,
        handler: async function (response) {
             // Verify the payment signature
            const verifyRes = await fetch('/api/payment/verify-payment',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    booking_id,
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_signature:response.razorpay_signature,
                })
             });
            const res = await verifyRes.json() 
            if(verifyRes.ok){
                router.replace(`/verification/${booking_id}`)
            }
        }
           
        
    }
    // Open Razorpay checkout
   const razorpay = new window.Razorpay(options);

    razorpay.open();
}