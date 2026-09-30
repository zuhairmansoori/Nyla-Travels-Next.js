"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();


  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -100 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}