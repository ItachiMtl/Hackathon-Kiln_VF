"use client"

import { motion } from "framer-motion"

export function KilnWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 rounded-lg p-4 h-full overflow-hidden border border-[#FF6521]/20 shadow-lg"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold mb-4 text-[#FF6521]"
      >
        Kiln Widget
      </motion.h2>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="h-[calc(100%-3rem)] w-full"
      >
        <iframe
          src="https://yieldia.widget.testnet.kiln.fi/overview?apiKey=kiln_FsjmvOU6Kxt1X3rFEe5VLwdsaYEjXqmw6GWJ7Gzy"
          title="Kiln Widget"
          allow="clipboard-write"
          className="w-full h-full rounded-lg"
        />
      </motion.div>
    </motion.div>
  )
}

