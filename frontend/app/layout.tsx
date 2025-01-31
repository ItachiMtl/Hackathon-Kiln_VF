import "./globals.css"
import { Inter } from "next/font/google"
import { DynamicProvider } from "./providers/DynamicProvider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
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
        <DynamicProvider>{children}</DynamicProvider>
      </body>
    </html>
  )
}

