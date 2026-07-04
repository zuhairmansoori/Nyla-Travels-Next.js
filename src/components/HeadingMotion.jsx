'use client'
import React from 'react'
import { motion } from 'motion/react'

function HeadingMotion({ children }) {
    return (
        <div>
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {children}
            </motion.h2>
        </div>
    )
}

export default HeadingMotion
