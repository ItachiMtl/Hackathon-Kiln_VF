"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Button } from "@/components/ui/button"
import { ethers } from "ethers"
import { toast } from "@/components/ui/use-toast"
import { OrderBook } from "../components/OrderBook"
import { VNFTChart } from "../components/VNFTChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VNFT {
  id: string
  price: number
  seller: string
  type: string
}

export default function Marketplace() {
  const [vNFTs, setVNFTs] = useState<VNFT[]>([
    { id: "1", price: 0.5, seller: "0x1234...", type: "Conservative" },
    { id: "2", price: 0.8, seller: "0x5678...", type: "Aggressive" },
    { id: "3", price: 0.3, seller: "0x9abc...", type: "Balanced" },
  ])
  const [selectedVNFT, setSelectedVNFT] = useState<VNFT | null>(null)

  const handleTransaction = async (vnft: VNFT, isBuy: boolean) => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "Error",
        description: "Please install MetaMask to proceed with the transaction",
        variant: "destructive",
      })
      return
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const message = `${isBuy ? "Buy" : "Sell"} vNFT #${vnft.id} for ${vnft.price} ETH`
      const signature = await signer.signMessage(message)

      toast({
        title: "Success",
        description: `Transaction ${isBuy ? "purchase" : "sale"} initiated for vNFT #${vnft.id}`,
      })

      console.log("Signature:", signature)
    } catch (error) {
      console.error("Transaction error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Transaction failed",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-[#FF6521] mb-8"
        >
          vNFT Marketplace
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="chart">
              <TabsList className="bg-white/5 p-1 rounded-lg mb-4">
                <TabsTrigger
                  value="chart"
                  className="text-white data-[state=active]:bg-[#FF6521] data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  Chart
                </TabsTrigger>
                <TabsTrigger
                  value="orderbook"
                  className="text-white data-[state=active]:bg-[#FF6521] data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  Order Book
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <VNFTChart />
                </div>
              </TabsContent>
              <TabsContent value="orderbook">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <OrderBook />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            {vNFTs.map((vnft) => (
              <motion.div
                key={vnft.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-[#FF6521]/50 transition-all duration-200"
              >
                <h2 className="text-2xl font-bold mb-2">vNFT #{vnft.id}</h2>
                <p className="text-gray-400 mb-2">Type: {vnft.type}</p>
                <p className="text-[#FF6521] text-xl mb-4">{vnft.price} ETH</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleTransaction(vnft, true)}
                    className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                  >
                    Buy
                  </Button>
                  <Button
                    onClick={() => handleTransaction(vnft, false)}
                    className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                  >
                    Sell
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
      <BackgroundAnimation />
    </div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-[#FF6521] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  )
}

