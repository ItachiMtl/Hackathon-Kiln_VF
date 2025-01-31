"use client"

import { DynamicWidget } from "@dynamic-labs/sdk-react-core"

export function DynamicConnect() {
  return (
    <DynamicWidget
      buttonClassName="bg-[#FF6521] text-white hover:bg-[#FF6521]/90 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg font-medium"
      innerButtonComponent={<span>Log in or Sign up</span>}
    />
  )
}

