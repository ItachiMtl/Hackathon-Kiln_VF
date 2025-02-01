"use client"

import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export function KilnLogo() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 })
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      rotateX.set(mouseY / 100)
      rotateY.set(mouseX / 100)
      x.set(mouseX / 50)
      y.set(mouseY / 50)
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animation = async () => {
      while (true) {
        await controls.start({
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 10,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          },
        })
      }
    }

    animation()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [controls, rotateX, rotateY, x, y])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      style={{
        x,
        y,
        rotateX,
        rotateY,
      }}
    >
      <motion.svg
        width="520"
        height="200"
        viewBox="0 0 520 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
        animate={controls}
      >
        <motion.path
          d="M386.516 26.416C388.173 26.416 389.516 27.7592 389.516 29.416V182.313C389.516 183.97 388.173 185.313 386.516 185.313H359.523C357.867 185.313 356.523 183.97 356.523 182.313V29.416C356.523 27.7592 357.867 26.416 359.523 26.416H386.516Z"
          fill="white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M340.305 66.1426C341.962 66.1426 343.305 67.4857 343.305 69.1426V182.313C343.305 183.97 341.962 185.313 340.305 185.313H313.313C311.656 185.313 310.312 183.97 310.312 182.313V69.1426C310.312 67.4857 311.656 66.1426 313.312 66.1426H340.305Z"
          fill="white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M69.194 96.8642C68.0216 98.0405 66.1167 98.0405 64.9443 96.8642L45.8252 77.6816C44.657 76.5095 44.6586 74.6127 45.8288 73.4425L86.571 32.7003C91.2573 28.014 98.8553 28.014 103.542 32.7003L144.285 73.4442C145.456 74.6144 145.457 76.5112 144.289 77.6833L125.171 96.8642C123.999 98.0405 122.094 98.0405 120.922 96.8642L97.1825 73.0465C96.0102 71.8703 94.1052 71.8703 92.9329 73.0465L69.194 96.8642Z"
          fill="white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  )
}

