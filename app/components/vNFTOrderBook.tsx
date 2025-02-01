"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface VNFT {
  id: string
  price: number
  seller: string
  type: string
}

export function VNFTOrderBook() {
  const [orders, setOrders] = useState<VNFT[]>([
    { id: "1", price: 0.5, seller: "0x1234...", type: "Conservative" },
    { id: "2", price: 0.8, seller: "0x5678...", type: "Aggressive" },
    { id: "3", price: 0.3, seller: "0x9abc...", type: "Balanced" },
  ])

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
      const provider = new ethers.providers.Web3Provider(window.ethereum as any)
      const signer = provider.getSigner()

      // Example message to sign
      const message = `${isBuy ? "Buy" : "Sell"} vNFT #${vnft.id} for ${vnft.price} ETH`
      const signature = await signer.signMessage(message)

      toast({
        title: "Success",
        description: `Transaction ${isBuy ? "purchase" : "sale"} initiated for vNFT #${vnft.id}`,
      })

      // Here you would typically make an API call to your backend to process the transaction
      console.log("Signature:", signature)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Transaction failed",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-black/40 backdrop-blur-lg p-6 rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-white">vNFT Order Book</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 pb-2 border-b border-white/10">
          <div>ID</div>
          <div>Type</div>
          <div>Price (ETH)</div>
          <div>Actions</div>
        </div>

        {orders.map((order) => (
          <motion.div
            key={order.id}
            className="grid grid-cols-4 gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white">#{order.id}</div>
            <div className="text-[#FF6521]">{order.type}</div>
            <div className="text-white">{order.price} ETH</div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleTransaction(order, true)}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
              >
                Buy
              </Button>
              <Button
                onClick={() => handleTransaction(order, false)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1"
              >
                Sell
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

