import CardCards from '@/components/car/CardCards'
import CarDeatls from '@/components/car/CarDeatls'
import connectDB from '@/lib/MongoDB'
import carModel from '@/model/carModel'
import React from 'react'
import { getCarBySlug } from '@/lib/car'

export const generateMetadata = async ({ params }) => {
    await connectDB()
    const { slug } =await params
    const cars = await getCarBySlug(slug);
    if (!cars) {
        return {
            title: "Car Not Found | Nyla Travels",
        };
    }
    const image = cars?.imageUrl?.map((img) => img.url)

    const data = JSON.parse(JSON.stringify(cars))
    return {
        title: `${data.carName} | Nyla Travels`,
        description: data.description?.slice(0, 150) || `Book ${cars.carName} with Nyla Travels`,
        keywords: [data.carName,
        data.categorie,
        data.bodyType,
        data.fuelType,
        data.transmission,
        ].filter(Boolean),
        alternates: {
            canonical: `/cars/${data.slug}`,
        },
        openGraph: {
            title: `${data.carName} | Nyla Travels`,
            description: data.description?.slice(0, 150) || `Book ${cars.carName} with Nyla Travels`,
            url: `/cars/${data.slug}`,
            siteName: 'Nyla Travels',
            images: [
                {
                    url: image[0] || '/og-car-rental.png',
                    width: 800,
                    height: 600,
                    alt: data.carName,
                }
            ]

        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.carName} | Nyla Travels`,
            description: data.description?.slice(0, 150) || `Book ${cars.carName} with Nyla Travels`,
            images: [
                {
                    url: image[0] || '/og-car-rental.png',
                    width: 800,
                    height: 600,
                    alt: data.carName,
                }
            ]
        },
        robots: {
            index: true,
            follow: true,
        }
    }

}


async function page({params}) {
    await connectDB()
    const {slug} = await params
    const cars = await carModel.findOne({slug}).lean()
    const data = JSON.parse(JSON.stringify(cars))
    const recomanded = await carModel.find({
      _id:{$ne:data._id},
      isActive:true,
      categorie: data.categorie
    })
    const recomandedData = JSON.parse(JSON.stringify(recomanded))

  return (
    <div>
      <CarDeatls car={data} />
      <div>
        <h2 className='text-center text-2xl'>Similar Cars</h2>
        <CardCards carsData={recomandedData} />
      </div>
    </div>
  )
}

export default page
