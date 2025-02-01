"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Order {
  id: string
  price: number
  size: number
  total: number
  type: "buy" | "sell"
}

export function OrderBook() {
  const [buyOrders, setBuyOrders] = useState<Order[]>([])
  const [sellOrders, setSellOrders] = useState<Order[]>([])
  const [lastTradePrice, setLastTradePrice] = useState<number | null>(null)
  const [userVNFTs, setUserVNFTs] = useState<number>(3) // Starting with 3 vNFTs for demonstration
  const [depositPrice, setDepositPrice] = useState<string>("")
  const [depositQuantity, setDepositQuantity] = useState<string>("1")
  const [isDepositing, setIsDepositing] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newBuyOrders = generateOrders(5, "buy")
      const newSellOrders = generateOrders(5, "sell")
      setBuyOrders(newBuyOrders)
      setSellOrders(newSellOrders)
      simulateTrade()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const generateOrders = (count: number, type: "buy" | "sell"): Order[] => {
    const basePrice = 1 + Math.random() * 0.1 // Base price around 1 ETH
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}-${i}`,
      price: type === "buy" ? basePrice - i * 0.01 : basePrice + i * 0.01,
      size: Math.round((Math.random() * 10 + 1) * 100) / 100,
      total: 0,
      type,
    })).map((order, _, array) => ({
      ...order,
      total: array.slice(0, array.indexOf(order) + 1).reduce((sum, o) => sum + o.size, 0),
    }))
  }

  const simulateTrade = () => {
    const tradePrice = 1 + Math.random() * 0.1 // Random price around 1 ETH
    setLastTradePrice(tradePrice)
  }

  const formatEther = (value: number): string => {
    return value.toFixed(6)
  }

  const handleTrade = async (order: Order) => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask not detected")
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const isBuying = order.type === "sell"
      const action = isBuying ? "Buy" : "Sell"
      const message = `${action} vNFT for ${formatEther(order.price)} ETH`

      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      })

      console.log("Signed message:", signature)

      if (isBuying) {
        setUserVNFTs((prev) => prev + 1)
        setSellOrders((prev) => prev.filter((o) => o.id !== order.id))
      } else {
        if (userVNFTs < 1) {
          throw new Error("Insufficient vNFTs for this transaction")
        }
        setUserVNFTs((prev) => prev - 1)
        setBuyOrders((prev) => prev.filter((o) => o.id !== order.id))
      }

      toast({
        title: `vNFT ${action}`,
        description: `You have successfully ${action.toLowerCase()}${isBuying ? "bought" : "sold"} a vNFT for ${formatEther(order.price)} ETH`,
      })
    } catch (error) {
      console.error(`Error in handle${action}:`, error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDeposit = async () => {
    if (!depositPrice || isNaN(Number(depositPrice)) || !depositQuantity || isNaN(Number(depositQuantity))) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid price and quantity for your vNFT",
        variant: "destructive",
      })
      return
    }

    const price = Number(depositPrice)
    const quantity = Number(depositQuantity)

    if (userVNFTs < quantity) {
      toast({
        title: "Insufficient vNFTs",
        description: `You only have ${userVNFTs} vNFTs available`,
        variant: "destructive",
      })
      return
    }

    setIsDepositing(true)

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask not detected")
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const message = `Deposit ${quantity} vNFT(s) for sale at ${price} ETH each`
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      })

      console.log("Signed message:", signature)

      const newOrder: Order = {
        id: `sell-${Date.now()}`,
        price: price,
        size: quantity,
        total: price * quantity,
        type: "sell",
      }

      setSellOrders((prev) => [...prev, newOrder].sort((a, b) => b.price - a.price))
      setUserVNFTs((prev) => prev - quantity)
      setDepositPrice("")
      setDepositQuantity("1")

      toast({
        title: "vNFT Deposited",
        description: `Your ${quantity} vNFT(s) have been listed for sale at ${price} ETH each`,
      })
    } catch (error) {
      console.error("Error in handleDeposit:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDepositing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/40 backdrop-blur-lg p-6 rounded-xl border border-white/10"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">vNFT Order Book</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-500">Buy Orders</h3>
          <div className="space-y-1">
            <AnimatePresence>
              {buyOrders.map((order) => (
                <OrderRow key={order.id} order={order} onTrade={handleTrade} formatEther={formatEther} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-500">Sell Orders</h3>
          <div className="space-y-1">
            <AnimatePresence>
              {sellOrders.map((order) => (
                <OrderRow key={order.id} order={order} onTrade={handleTrade} formatEther={formatEther} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {lastTradePrice && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-[#FF6521]">Last Trade</h3>
          <p className="text-2xl font-bold text-white">{formatEther(lastTradePrice)} ETH</p>
        </motion.div>
      )}
      <div className="bg-white/5 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Your vNFTs: {userVNFTs}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#FF6521] hover:bg-[#FF6521]/90 text-white">Deposit vNFT</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle>Deposit vNFT for Sale</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Price (ETH)
                </label>
                <Input
                  id="price"
                  type="number"
                  value={depositPrice}
                  onChange={(e) => setDepositPrice(e.target.value)}
                  className="col-span-3 bg-gray-800 text-white"
                  placeholder="Enter price in ETH"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  value={depositQuantity}
                  onChange={(e) => setDepositQuantity(e.target.value)}
                  className="col-span-3 bg-gray-800 text-white"
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            <Button
              onClick={handleDeposit}
              className="w-full bg-[#FF6521] hover:bg-[#FF6521]/90 text-white"
              disabled={isDepositing}
            >
              {isDepositing ? "Depositing..." : "Confirm Deposit"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  )
}

function OrderRow({
  order,
  onTrade,
  formatEther,
}: {
  order: Order
  onTrade: (order: Order) => void
  formatEther: (value: number) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: order.type === "buy" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: order.type === "buy" ? -20 : 20 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center text-sm"
    >
      <span className={order.type === "buy" ? "text-green-500" : "text-red-500"}>{formatEther(order.price)}</span>
      <span className="text-white">{order.size.toFixed(2)}</span>
      <span className="text-gray-400">{order.total.toFixed(2)}</span>
      <Button
        onClick={() => onTrade(order)}
        className={`${
          order.type === "buy" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        } text-white text-xs px-2 py-1`}
      >
        {order.type === "buy" ? "Sell" : "Buy"}
      </Button>
    </motion.div>
  )
}

