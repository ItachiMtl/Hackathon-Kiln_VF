import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"

// Your Dynamic environment ID from the dashboard
const DYNAMIC_ENVIRONMENT_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || ""

export const dynamicConfig = {
  environmentId: DYNAMIC_ENVIRONMENT_ID,
  walletConnectors: [EthereumWalletConnectors],
  settings: {
    enableVisitTrackingOnConnectOnly: true,
    enableAccountLinking: true,
    enableSmartWalletSigning: true, // Enable account abstraction
    enableMultiAccountWallets: true,
  },
}