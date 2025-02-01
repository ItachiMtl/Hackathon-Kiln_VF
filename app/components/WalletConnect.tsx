"use client"

import { useState, useEffect } from "react"
import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react-core"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function WalletConnect() {
  const { user, handleLogOut, isLoading } = useDynamicContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent hydration errors
  }

  const handleDisconnect = async () => {
    try {
      await handleLogOut()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      toast({
        title: "Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="animate-pulse bg-[#FF6521]/20 p-2 rounded-lg">Loading...</div>
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">{user.walletPublicKey && truncateAddress(user.walletPublicKey)}</span>
          <Button
            variant="outline"
            className="border-[#FF6521] text-[#FF6521] hover:bg-[#FF6521] hover:text-white transition-all"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <DynamicWidget
          buttonClassName="bg-[#FF6521] text-white hover:bg-[#FF6521]/90 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg font-medium"
          innerButtonComponent={<span>Connect Wallet</span>}
        />
      )}
    </div>
  )
}

