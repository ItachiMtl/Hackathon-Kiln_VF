import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Shield, Zap } from "lucide-react"
import type React from "react" // Added import for React

export function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-start justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-[#FF6521]" />
            <span className="text-[#FF6521] font-semibold">AI Agent for DeFi</span>
          </div>
          <h1 className="text-6xl font-bold leading-tight mb-8 text-white">
            Maximize Your Yields with Artificial Intelligence
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Our AI agent analyzes the best yield opportunities in DeFi in real-time, optimizes your positions, and
            secures your investments.
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#FF6521] text-white hover:bg-[#FF6521]/90 px-8 py-6 text-lg">Get Started Now</Button>
            <Button variant="outline" className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-20">
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
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-[#FF6521]/50 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

