"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Briefcase, Scale, Rocket, ChevronRight, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type React from "react" // Added import for React

declare global {
  interface Window {
    ethereum?: any
  }
}

interface Profile {
  name: string
  risk: string
  strategy: string
  icon: React.ElementType
  color: string
  expectedReturn: number
  volatility: number
}

export function InvestmentProfiles({ onProfileSelect }: { onProfileSelect: (profile: string) => void }) {
  const [signingProfile, setSigningProfile] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [progress, setProgress] = useState(0)

  const profiles: Profile[] = [
    {
      name: "Conservative",
      risk: "Low",
      strategy: "Focus on stable, low-risk yield opportunities",
      icon: Briefcase,
      color: "#4CAF50",
      expectedReturn: 5,
      volatility: 2,
    },
    {
      name: "Balanced",
      risk: "Medium",
      strategy: "Mix of stable and higher-yield opportunities",
      icon: Scale,
      color: "#2196F3",
      expectedReturn: 10,
      volatility: 5,
    },
    {
      name: "Aggressive",
      risk: "High",
      strategy: "Focus on high-yield opportunities with higher risk",
      icon: Rocket,
      color: "#F44336",
      expectedReturn: 20,
      volatility: 15,
    },
  ]

  useEffect(() => {
    if (selectedProfile) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 20)
      return () => clearInterval(interval)
    }
  }, [selectedProfile])

  const signRiskProfile = async (profile: Profile) => {
    console.log("Starting signRiskProfile for:", profile.name)
    setSigningProfile(profile.name)
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask not detected")
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      console.log("Connected accounts:", accounts)

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const message = `I confirm my choice of the ${profile.name} profile`
      console.log("Message to sign:", message)

      const signedMessage = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      })

      console.log("Signed message:", signedMessage)

      toast({
        title: "Profile Confirmed",
        description: `You've selected the ${profile.name} profile`,
      })

      setSelectedProfile(profile)
      onProfileSelect(profile.name)
    } catch (error) {
      console.error("Error in signRiskProfile:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setSigningProfile(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 rounded-lg p-4 h-[500px] overflow-y-auto border border-[#FF6521]/20 shadow-lg"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold mb-4 text-[#FF6521]"
      >
        Your Investment Profile
      </motion.h2>
      <AnimatePresence mode="wait">
        {selectedProfile ? (
          <motion.div
            key="selected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#FF6521]/20 to-[#FF8C69]/20 p-4 rounded-lg border border-[#FF6521]/30"
          >
            <div className="flex items-center mb-4">
              <selectedProfile.icon className="h-8 w-8 text-[#FF6521] mr-2" />
              <h3 className="text-xl font-semibold text-white">{selectedProfile.name}</h3>
            </div>
            <p className="text-sm text-[#FF6521] mb-2">Risk: {selectedProfile.risk}</p>
            <p className="text-sm text-gray-300 mb-4">{selectedProfile.strategy}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Profile Activation</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className={`h-2 bg-${selectedProfile.color.replace("#", "")}`} />
            </div>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full bg-[#FF6521] hover:bg-[#FF6521]/90 text-white flex items-center justify-center"
            >
              {showDetails ? "Hide Details" : "Show Details"}
              <ChevronRight className={`ml-2 transform transition-transform ${showDetails ? "rotate-90" : ""}`} />
            </Button>
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-gray-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span>Expected Return:</span>
                    <span className="text-[#FF6521]">{selectedProfile.expectedReturn}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Volatility:</span>
                    <span className="text-[#FF6521]">{selectedProfile.volatility}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Management:</span>
                    <Activity className="text-[#FF6521]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="profiles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {profiles.map((profile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-gradient-to-br from-[#FF6521]/20 to-[#FF8C69]/20 p-4 rounded-lg border border-[#FF6521]/30 hover:border-[#FF6521]/50 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <profile.icon className="h-6 w-6 text-[#FF6521] mr-2" />
                  <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                </div>
                <p className="text-sm text-[#FF6521] mb-2">Risk: {profile.risk}</p>
                <p className="text-sm text-gray-300 mb-4">{profile.strategy}</p>
                <Button
                  onClick={() => signRiskProfile(profile)}
                  disabled={signingProfile !== null}
                  className="w-full bg-[#FF6521] hover:bg-[#FF6521]/90 text-white"
                >
                  {signingProfile === profile.name ? "Confirming..." : `Confirm ${profile.name} Profile`}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

