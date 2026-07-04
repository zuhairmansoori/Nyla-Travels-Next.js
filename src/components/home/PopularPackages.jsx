'use client'
import React from 'react'
import Container from '../Container'
import PackageCard from "../PackageCard";
import { packages } from "@/components/data/packages";
import { motion } from 'motion/react';
function PopularPackages() {
    return (
        <>
            <section>
                <Container>
                    <div className='container mx-auto px-4'>
                        <div className='container mx-auto mb-12 pt-20 max-w-2xl text-center'>
                            <motion.h2
                                // animate={{ x: [0, -200,200, 0] }}
                                // transition={{ 
                                //     duration: 2,
                                //     ease: "easeInOut"
                                // }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className=' text-4xl text-secondary font-bold'>Popular Packages</motion.h2>
                            <p className="mt-4 text-muted-foreground">Explore our most popular travel packages, carefully designed to give you the perfect balance of comfort, adventure, and unforgettable experiences at the best value.</p>
                        </div>
                        <div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {packages.map((pkg) => (
                                    <PackageCard
                                        key={pkg.name}
                                        pkg={pkg}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </Container>

            </section>
        </>
    )
}

export default PopularPackages
