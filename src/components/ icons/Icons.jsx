'use client'
import React from 'react'
import { Whatsapp,Instagram } from "@/helper/IconsFnx";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

export function WhatsappIcon({...props}){
  return(
    <>
      <FaInstagram {...props} onClick={()=>Instagram()}/>
    </>
  )
}

export function InstagramIcon({...props}){
  return(
    <>
     <FaWhatsapp {...props} onClick={()=>Whatsapp()}/>
    </>
  )
}