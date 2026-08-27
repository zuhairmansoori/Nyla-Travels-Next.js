import Image from 'next/image'
import React from 'react'

function CarDeatls({ car }) {
    return (
        <div>
            <section>
                <div>
                    <div>
                        <h1>{car.carName}</h1>
                    </div>



                    <div>
                        <Image src={car?.image} width={400} height={200} alt={car.title} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CarDeatls
