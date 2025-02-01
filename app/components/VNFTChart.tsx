"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

interface VNFTData {
  time: string
  price: number
}

export function VNFTChart() {
  const [chartData, setChartData] = useState<VNFTData[]>([])
  const [lastPrice, setLastPrice] = useState<number>(0)

  useEffect(() => {
    // Initial data generation
    const initialData = generateChartData()
    setChartData(initialData)
    setLastPrice(initialData[initialData.length - 1].price)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      const newData = generateChartData()
      setChartData(newData)
      setLastPrice(newData[newData.length - 1].price)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const generateChartData = (): VNFTData[] => {
    const data: VNFTData[] = []
    let price = lastPrice || 1 // Start with 1 ETH if no last price
    const now = new Date()

    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() - (24 - i) * 3600000)
      price = price + (Math.random() - 0.5) * 0.05 // Smaller price changes
      data.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price: Number.parseFloat(price.toFixed(4)),
      })
    }

    return data
  }

  const handleBuy = () => {
    // Simulate a purchase by increasing the price by a small amount
    const newPrice = lastPrice * (1 + Math.random() * 0.05) // Increase by up to 5%
    const newData = [
      ...chartData.slice(1),
      { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), price: newPrice },
    ]
    setChartData(newData)
    setLastPrice(newPrice)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#FF6521]/10 to-[#FF8C69]/10 p-6 rounded-xl border border-white/10"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">vNFT Price Chart (ETH)</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6521" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6521" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid #FF6521" }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "#FF6521" }}
              formatter={(value: number) => `${value.toFixed(4)} ETH`}
            />
            <Area type="monotone" dataKey="price" stroke="#FF6521" fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Latest Price</h3>
          <p className="text-[#FF6521] text-xl">{lastPrice.toFixed(4)} ETH</p>
        </div>
        <Button onClick={handleBuy} className="bg-[#FF6521] hover:bg-[#FF6521]/90 text-white">
          Simulate Buy
        </Button>
      </div>
    </motion.div>
  )
}

