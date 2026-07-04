
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Image from 'next/image'
import {  InstagramIcon, WhatsappIcon } from "./ icons/Icons";


export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 overflow-x-hidden">
      <div className="container mx-auto px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 md:justify-items-center ">

          {/* About */}
          <div>
            <div className='flex  justify-start items-center'>
              <Image src={'/NylaTravels.svg'} alt='Nyla Travels' width={60} height={60} loading='eager' />
              <h2 className='text-xl'>
                <span className='text-primary'>Nayla</span><span className='text-secondary'>Travels</span>
              </h2>
            </div>

            <p className="text-muted-foreground">
              Creating unforgettable travel experiences with
              carefully crafted packages, flights, hotels,
              and visa assistance worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">
              Quick Links
            </h4>

            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-secondary"><Link href="/">Home</Link></li>
              <li className="hover:text-secondary"><Link href="/">Destinations</Link></li>
              <li className="hover:text-secondary"><Link href="/">Packages</Link></li>
              <li className="hover:text-secondary"><Link href="/">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">
              Services
            </h4>

            <ul className="space-y-3 text-muted-foreground cursor-pointer">
              <li className="hover:text-secondary">Flight Booking</li>
              <li className="hover:text-secondary">Hotel Booking</li>
              <li className="hover:text-secondary">Visa Assistance</li>
              <li className="hover:text-secondary">Travel Insurance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">
              Contact Us
            </h4>

            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Phone className="size-4" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <span>info@nylatravels.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-4" />
                <span>
                 Laxmi Nagar, New Delhi, India
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <FaFacebookF className="size-5 cursor-pointer"  />
              <InstagramIcon  className="size-5 cursor-pointer"/>
              <FaXTwitter className="size-5 cursor-pointer" />
               <WhatsappIcon className="size-5 cursor-pointer"/>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nyla Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}