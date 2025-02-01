"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Chatbot } from "../components/Chatbot"
import { KilnWidget } from "../components/KilnWidget"
import { InvestmentProfiles } from "../components/InvestmentProfiles"
import { InstitutionalContact } from "../components/InstitutionalContact"
import { Footer } from "../components/Footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Shield, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"

const MotionButton = motion(Button)

export default function GetStarted() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<"welcome" | "main">("welcome")

  const handleProfileSelect = (profile: string) => {
    setSelectedProfile(profile)
  }

  const handleGetStarted = () => {
    setActiveSection("main")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        {activeSection === "welcome" ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex items-center justify-center relative z-10"
          >
            <div className="text-center">
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6521] via-[#FF8C69] to-[#FFA07A]"
              >
                Welcome to YieldAI
              </motion.h1>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl mb-8 text-gray-300"
              >
                Maximize your yields with cutting-edge AI technology
              </motion.p>
              <MotionButton
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF6521] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FF8C69] transition-colors duration-300"
              >
                Get Started <ArrowRight className="ml-2 inline-block" />
              </MotionButton>
            </div>
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow container mx-auto px-4 py-12 relative z-10"
          >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-5xl font-bold text-[#FF6521] mb-4">Get Started with YieldAI</h1>
              {selectedProfile && (
                <p className="text-xl text-white mb-8">
                  Your Profile: <span className="text-[#FF6521]">{selectedProfile}</span>
                </p>
              )}
            </motion.div>

            <Tabs defaultValue="individual" className="mb-12">
              <TabsList className="bg-white/5 p-1 rounded-lg">
                <TabsTrigger
                  value="individual"
                  className="text-white data-[state=active]:bg-[#FF6521] data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  Individual
                </TabsTrigger>
                <TabsTrigger
                  value="institutional"
                  className="text-white data-[state=active]:bg-[#FF6521] data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  Institutional
                </TabsTrigger>
              </TabsList>
              <TabsContent value="individual">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <div className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 p-6 rounded-lg border border-[#FF6521]/20 hover:border-[#FF6521]/50 transition-all duration-200 shadow-lg">
                    <Chatbot />
                  </div>
                  <div className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 p-6 rounded-lg border border-[#FF6521]/20 hover:border-[#FF6521]/50 transition-all duration-200 shadow-lg lg:row-span-2">
                    <KilnWidget />
                  </div>
                  <div className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 p-6 rounded-lg border border-[#FF6521]/20 hover:border-[#FF6521]/50 transition-all duration-200 shadow-lg">
                    <InvestmentProfiles onProfileSelect={handleProfileSelect} />
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="institutional">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <InstitutionalContact />
                </motion.div>
              </TabsContent>
            </Tabs>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8 text-[#FF6521]" />}
                title="Optimized Yields"
                description="15-25% average annual yield optimized by AI"
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-[#FF6521]" />}
                title="Risk Management"
                description="Real-time protocol analysis and risk protection"
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-[#FF6521]" />}
                title="Automatic Execution"
                description="Automatic repositioning to the best opportunities"
              />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
      <Footer />
      <BackgroundAnimation />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 p-6 rounded-lg border border-[#FF6521]/20 hover:border-[#FF6521]/50 transition-all duration-200 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-0 -left-4 w-72 h-72 bg-[#FF6521] rounded-full mix-blend-multiply filter blur-xl opacity-20"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
      />
    </div>
  )
}

