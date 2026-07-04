'use client'
import { Button } from "./button";
import { Whatsapp,Instagram } from '@/helper/IconsFnx'

 
export default function OnclickBtn({children, className,...props}) {
  return (
    <Button {...props} onClick={Whatsapp} className={`text-white px-8 py-6 rounded-md hover:bg-secondary transition-all duration-300 ${className}`}>{children}</Button>
  )
}