"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const API_KEY = "xxx" // Insérer clé API
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`

const initialPrompt = `You are an AI agent powered by Kiln API, dynamically adapting portfolio allocations in real-time. Your specialization is crypto portfolio management, offering strategic rebalancing and optimization based on market conditions, fees, and APY projections. You provide strategies for three types of investors:

Conservative: A defensive strategy minimizing volatility, prioritizing stablecoins and ERC-4626 yield-bearing assets.
Example allocation: 27% WBTC, 30% DAI, 20% stETH, 15% USDC, 8% aUSDT.

Balanced: A hybrid approach balancing security and growth, combining stablecoins, Ethereum, and major DeFi assets.
Example allocation: 20% ETH, 25% USDC, 20% MATIC, 20% BNB, 15% AVAX.

Aggressive: A high-risk strategy maximizing potential returns with volatile tokens and DeFi protocols.
Example allocation: 15% SOL, 20% LINK, 25% ARB, 20% OP, 20% GMX.

Key financial strategies:
Modern Portfolio Theory (MPT) - Optimizing risk-adjusted returns
Risk Parity - Balancing allocation based on asset volatility
DeFi Yield Stacking - Leveraging farming, staking, and vaults
Statistical Arbitrage - Exploiting inefficiencies in DeFi trading
Momentum Trading on L2s - Capturing market momentum on Ethereum rollups

Your answers should be concise, informative, and actionable, providing clear guidance for investors. You can also offer additional resources, tools, and educational content to enhance the user experience. Less than 10 lines
Do not make bold in response and make line breaks
`

export function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (input.trim() === "") return

    setMessages((prev) => [...prev, { text: input, isUser: true }])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${initialPrompt} \n User: ${input}` }],
            },
          ],
        }),
      })

      const data = await response.json()
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur dans la réponse AI."

      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }])
    } catch (error) {
      console.error("Erreur API:", error)
      setMessages((prev) => [...prev, { text: "Erreur de connexion à l'IA.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-[600px] flex flex-col border border-[#FF6521]/20">
      <h2 className="text-2xl font-bold mb-4 text-[#FF6521]">AI Assistant</h2>
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.isUser ? "bg-[#FF6521] text-white ml-auto" : "bg-gray-800 text-gray-300"
            } max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="text-gray-400">AI est en train d'écrire...</div>}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask the AI assistant..."
          className="flex-grow bg-gray-800 text-white border-[#FF6521]/20"
          disabled={loading}
        />
        <Button onClick={handleSend} className="bg-[#FF6521] hover:bg-[#FF6521]/90 text-white" disabled={loading}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  )
}

