import Booking from '@/model/bookingModel';
import { getSession } from 'better-auth/api';
import { NextResponse } from 'next/server';
import visaModel from '@/model/visa';
import carModel from "@/model/carModel";
import activityModel from '@/model/activityModel';
import {auth} from '@/lib/auth';
import connectDB from '@/lib/MongoDB';
import {headers} from 'next/headers';

async function getItemDetails(model, itemId){
  
    try{
        await connectDB();
        const item = await model.findById(itemId).lean();
        if(!item){
            return  {message: "Item not found", status: 404}
        }
        return item;
    }catch(error){
        console.error(error);
        return  {message: "Internal Server Error", status: 500}
        ;
    }
   

}


export async function POST(req){
    //   const session = await auth.api.getSession({
    //     headers: await headers(),
    // })
    // if(!session || !session.user){
    //     return NextResponse.json({message: "Unauthorized"}, {status: 401});
    // }
   
    let bookingItemDetails;
    let details ;
    try {
        const {form ,bookingType, itemId} = await req.json();
     
        switch (bookingType){
            case "visa":{
                const visaItem = await getItemDetails(visaModel, itemId);
                if(visaItem.status && visaItem.status !== 200){
                    return NextResponse.json({message: visaItem.message}, {status: visaItem.status});
                }
                bookingItemDetails = visaItem;
                break;

            }case "car":{
                const carItem = await getItemDetails(carModel, itemId);
                if(carItem.status && carItem.status !== 200){
                    return NextResponse.json({message: carItem.message}, {status: carItem.status});
                }
                bookingItemDetails = {carItem,price:carItem[form.type].price};
                details = {
                    address:form.address,
                    pickupDate:form.pickupDate,
                    retuneDate:form.tomorrow,
                    type:form.type,
                    phone:form.phone
                    
                }
                break;
            }case "package":{
                const packageItem = await getItemDetails(activityModel, itemId);
                if(packageItem.status && packageItem.status !== 200){
                    return NextResponse.json({message: packageItem.message}, {status: packageItem.status});
                }
                const packages = structuredClone(packageItem)
                packages.price = packages.price * form.person 
                bookingItemDetails = packages;
                   details = {
                    address:form.address,
                    pickupDate:form.activityDate,
                    person:form.person,
                    phone:form.phone
                    
                }
                break;
            }default:{
                return NextResponse.json({message: "Invalid booking type"}, {status: 400});
            }
        }
      
    //   const name = session.user.name.split(' ')
        const booking = await Booking.create({
            user:form.name,
            bookingType,
            itemId,
            customer: {
                firstName: name[0],
                lastName: name[1] || '',
                email: form.email,
                phone:form.phone
            },
            details: {item:bookingItemDetails,detail:details},
            pricing: {
                subtotal: bookingItemDetails.price,
                tax: bookingItemDetails.price * 18/100,
                total: bookingItemDetails.price +  bookingItemDetails.price * 18/100,
            },
      
        })
        return NextResponse.json({booking}, {status: 201
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}