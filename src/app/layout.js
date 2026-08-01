import { Geist, Geist_Mono ,Cinzel} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
  import {LenisProvider} from "@/components/SmoothScroll";
import WhatsappSvg from "@/components/ icons/WhatsappSvg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://nylatravels.com"),

  title: {
    default: "Nyla Travels | Flights, Hotels, Visa & Holiday Packages",
    template: "%s | Nyla Travels",
  },

  description:
    "Book flights, hotels, visa services, airport transfers, and holiday packages with Nyla Travels at affordable prices.",

  keywords: [
    "Nyla Travels",
    "Flights",
    "Dubai Visa",
    "Holiday Packages",
    "Hotels",
    "Airport Transfer",
    "Travel Agency",
    "Travel Booking",
    "Cheap Flights",
    "UAE Visa",
  ],

  authors: [
    {
      name: "Nyla Travels",
    },
  ],

  creator: "Nyla Travels",

  publisher: "Nyla Travels",

  applicationName: "Nyla Travels",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Nyla Travels",
    description:
      "Book flights, hotels, visas and holiday packages with Nyla Travels.",
    url: "https://nylatravels.com",
    siteName: "Nyla Travels",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Nyla Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nyla Travels",
    description:
      "Flights, Hotels, Visa Services & Holiday Packages",
    images: ["/og-home.jpg"],
  },

};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100">
        <LenisProvider>
             <header className="sticky z-50 top-0 right-0 left-0">
          <nav>
            <Nav />
          </nav>
        </header>
        {children}
        <div className='fixed bottom-10 right-5 z-50'><WhatsappSvg width={50} height={50} /></div>
        <Footer />
        </LenisProvider>
      

j
      </body>
    </html>
  );
}
