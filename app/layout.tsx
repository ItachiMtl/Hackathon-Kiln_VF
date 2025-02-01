import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { DynamicProvider } from "./lib/dynamic"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YieldAI - AI-Powered DeFi Yields",
  description: "Maximize your DeFi yields with our AI agent",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicProvider>
          {children}
          <Toaster />
        </DynamicProvider>
      </body>
    </html>
  )
}

