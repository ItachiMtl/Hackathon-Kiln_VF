import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"
import type React from "react"

const DYNAMIC_ENVIRONMENT_ID = "85fcddbb-2a71-4876-9b50-de0b264d9c71"

export const dynamicConfig = {
  environmentId: DYNAMIC_ENVIRONMENT_ID,
  walletConnectors: [EthereumWalletConnectors],
  settings: {
    environmentId: DYNAMIC_ENVIRONMENT_ID,
    walletConnectors: [EthereumWalletConnectors],
    enableVisitTrackingOnConnectOnly: true,
    enableAccountLinking: true,
    enableSmartWalletSigning: true,
    enableMultiAccountWallets: true,
  },
}

export const DynamicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DynamicContextProvider settings={dynamicConfig}>{children}</DynamicContextProvider>
}

