import razorpay from 'razorpay';

const rzp = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
})

export default rzp;
