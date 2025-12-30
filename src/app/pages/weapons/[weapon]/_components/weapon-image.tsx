"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"

interface WeaponImageProps {
  src: string
  alt: string
}

export function WeaponImage({ src, alt }: WeaponImageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30
        }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={256}
          height={256}
          priority
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover w-full h-full"
        />
      </motion.div>
    </AnimatePresence>
  )
}
