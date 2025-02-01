"use client"

import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center gap-2 mb-4"
        >
          <Brain className="h-8 w-8 text-[#FF6521]" />
          <span className="text-[#FF6521] font-semibold">AI Agent for DeFi</span>
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl font-bold leading-tight mb-8 text-white"
        >
          Maximize Your Yields with Artificial Intelligence
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-400 mb-8"
        >
          Our AI agent analyzes the best yield opportunities in DeFi in real-time, optimizes your positions, and secures
          your investments.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-4"
        >
          <Link href="/get-started" className="inline-block">
            <Button className="bg-[#FF6521] text-white hover:bg-[#FF6521]/90 px-8 py-6 text-lg">Get Started Now</Button>
          </Link>
          <Button variant="outline" className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10">
            Watch Demo
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
      >
        <FeatureCard
          icon={<TrendingUp className="h-6 w-6 text-[#FF6521]" />}
          title="Optimized Yields"
          description="15-25% average annual yield optimized by AI"
        />
        <FeatureCard
          icon={<Shield className="h-6 w-6 text-[#FF6521]" />}
          title="Risk Management"
          description="Real-time protocol analysis and risk protection"
        />
        <FeatureCard
          icon={<Zap className="h-6 w-6 text-[#FF6521]" />}
          title="Automatic Execution"
          description="Automatic repositioning to the best opportunities"
        />
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-[#FF6521]/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

