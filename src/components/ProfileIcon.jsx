'use client'
import React from 'react'
import { clientAuth } from '@/lib/client-auth'
import GoogleLogIn from './GoogleLogIn'
import Image from 'next/image'
import { User } from "lucide-react";
export function ProfileIcon() {
const {data,isPending} = clientAuth.useSession()
if(!data)return<><GoogleLogIn/> </>
// if(ispanding) return <>Loading...</>
console.log(data.user.image);

const name = data?.user?.name?.split(' ')

  return (
    <>
    <div className='flex flex-col items-center justify-center'>
    {data?.user?.image? <Image
      src={data?.user?.image}
      alt={data?.user?.name}
      width={45}
      height={45}
      className='rounded-full' 
     />:<User className='border-2 border-black rounded-full' size={45}/>}
    
     <p className='text-gray-900'>{name[0]}</p>
    </div>
   
      
    </>
  )
}

export default ProfileIcon
