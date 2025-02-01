"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import WalletConnect from "./WalletConnect"

const menuItems = [
  {
    trigger: "Marketplace",
    content: [
      { title: "vNFT Trading", href: "/marketplace" },
      { title: "My Portfolio", href: "/marketplace/portfolio" },
    ],
  },
  {
    trigger: "Strategies",
    content: [
      { title: "DeFi Yield Farming", href: "#" },
      { title: "Optimized Staking", href: "#" },
    ],
  },
  {
    trigger: "Intelligence",
    content: [],
  },
  {
    trigger: "Analytics",
    content: [],
  },
]

export function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 py-4 relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="relative">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-10 h-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kiln-startup-caption-profile-1670578634.jpg-kNLVjDNG4xSnErgusaXOe7BynAl8FB.jpeg"
              alt="Kiln Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </motion.div>
        </Link>
        <div className="flex items-center justify-center flex-grow">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.trigger}>
                  <NavigationMenuTrigger
                    className="text-base font-normal text-white relative"
                    onMouseEnter={() => setHoveredItem(item.trigger)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.trigger}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-[2px] bg-[#FF6521]"
                      layoutId="underline"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredItem === item.trigger ? "100%" : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </NavigationMenuTrigger>
                  {item.content.length > 0 && (
                    <NavigationMenuContent>
                      <motion.div
                        className="w-[400px] p-4 bg-black/90 backdrop-blur-md border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <div className="grid gap-3">
                          {item.content.map((subItem) => (
                            <NavigationMenuLink key={subItem.title} asChild>
                              <Link
                                href={subItem.href}
                                className="text-white hover:text-[#FF6521] transition-colors relative group block p-2"
                              >
                                {subItem.title}
                                <motion.div
                                  className="absolute -bottom-1 left-0 h-[2px] bg-[#FF6521]"
                                  initial={{ width: 0 }}
                                  whileHover={{ width: "100%" }}
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </motion.div>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <WalletConnect />
      </div>
    </nav>
  )
}

