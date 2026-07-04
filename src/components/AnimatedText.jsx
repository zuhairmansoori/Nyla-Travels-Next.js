// AnimatedText.jsx
"use client";

import { motion } from "motion/react";

export default function AnimatedText({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{duration:0.3}}
    >
      {children}
    </motion.div>
  );
}