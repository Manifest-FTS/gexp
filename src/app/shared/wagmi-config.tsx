'use client';
import { WagmiProvider } from 'wagmi';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia, arbitrum, polygon } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createSIWEConfig } from '@web3modal/siwe';

const queryClient = new QueryClient();

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const projectId = '882e57d7426200de1ce35607e26a6392';

export const config = defaultWagmiConfig({
  chains: [arbitrum, mainnet, polygon, sepolia],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
});

export default function WagmiConfig({ children }: React.PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
