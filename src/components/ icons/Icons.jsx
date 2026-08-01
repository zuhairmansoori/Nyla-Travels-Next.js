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
      <FaWhatsapp {...props} onClick={()=>Whatsapp()}/>
    </>
  )
}

export function InstagramIcon({...props}){
  return(
    <>
     <FaInstagram {...props} onClick={()=>Instagram()}/>
    </>
  )
}