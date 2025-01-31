"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkMetaMask = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        setIsMetaMaskInstalled(true)
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum as any)
          const accounts = await provider.listAccounts()
          if (accounts.length > 0) {
            setAccount(accounts[0])
          }
        } catch (error) {
          console.error("Failed to connect to MetaMask:", error)
        }
      } else {
        setIsMetaMaskInstalled(false)
      }
    }

    checkMetaMask()

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0])
      } else {
        setAccount(null)
      }
    }

    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const connectWallet = async () => {
    setError(null)
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          const signer = provider.getSigner()
          const address = await signer.getAddress()
          setAccount(address)
        } else {
          throw new Error("No accounts received from MetaMask")
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        if (error instanceof Error) {
          setError(`Failed to connect wallet: ${error.message}`)
        } else {
          setError("Failed to connect wallet. Please try again.")
        }
      }
    }
  }

  if (isMetaMaskInstalled === null) {
    return <div className="animate-pulse bg-kiln-purple/20 p-4 rounded-lg">Loading...</div>
  }

  if (isMetaMaskInstalled === false) {
    return (
      <Alert variant="destructive" className="bg-kiln-pink/20 border-kiln-pink text-white">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>MetaMask Not Detected</AlertTitle>
        <AlertDescription>
          Please install MetaMask to connect your wallet.
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1 text-kiln-blue"
          >
            Download MetaMask
          </a>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-xl border border-kiln-purple/20">
      {error && (
        <Alert variant="destructive" className="mb-4 bg-kiln-pink/20 border-kiln-pink text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {account ? (
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-kiln-blue truncate max-w-[150px]">{account}</p>
          <Button
            onClick={() => setAccount(null)}
            variant="outline"
            className="w-full border-kiln-purple text-kiln-purple hover:bg-kiln-purple hover:text-white transition-all"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          className="w-full bg-gradient-to-r from-kiln-purple to-kiln-pink text-white hover:opacity-90 transition-all duration-200 ease-in-out"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  )
}

