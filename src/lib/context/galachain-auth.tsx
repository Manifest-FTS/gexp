/**
 * 🔐 Galachain Authentication Context
 * Manages user authentication with Galachain SDK
 */

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Types for Galachain authentication
export interface GalachainUser {
  address: string;
  publicKey: string;
  alias?: string;
  profile?: {
    username?: string;
    avatar?: string;
    email?: string;
  };
}

export interface GalachainAuthContextType {
  user: GalachainUser | null;
  isAuthenticated: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
  getJWTToken: () => string | null;
}

const GalachainAuthContext = createContext<
  GalachainAuthContextType | undefined
>(undefined);

// Connection method implementations
async function connectViaExtension(): Promise<GalachainUser | null> {
  try {
    const galachain = (window as any).galachain;

    // Request account access
    const accounts = await galachain.request({
      method: 'gala_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const address = accounts[0];

    // Get public key
    const publicKey = await galachain.request({
      method: 'gala_getPublicKey',
      params: [address],
    });

    return {
      address,
      publicKey,
      alias: 'GalaUser',
      profile: {
        username: `gala_${address.slice(0, 8)}`,
        avatar: `https://picsum.photos/seed/${address}/150/150`,
      },
    };
  } catch (error: any) {
    console.error('Galachain extension connection failed:', error);
    return null;
  }
}

async function connectViaEthereum(): Promise<GalachainUser | null> {
  try {
    const ethereum = (window as any).ethereum;

    // Request account access
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const address = accounts[0];

    return {
      address,
      publicKey: `eth_pubkey_${Date.now()}`, // Placeholder - would need real conversion
      alias: 'EthUser',
      profile: {
        username: `eth_${address.slice(0, 8)}`,
        avatar: `https://picsum.photos/seed/${address}/150/150`,
      },
    };
  } catch (error: any) {
    console.error('Ethereum wallet connection failed:', error);
    return null;
  }
}

async function connectViaMock(): Promise<GalachainUser | null> {
  // Simulate async connection delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    address: '0x' + Math.random().toString(16).substring(2, 42),
    publicKey: 'mock_public_key_' + Date.now(),
    alias: 'TestUser',
    profile: {
      username: 'dev_user_' + Math.floor(Math.random() * 1000),
      avatar: `https://picsum.photos/seed/${Math.random()}/150/150`,
    },
  };
}

// Generate authentication message for signing
function createAuthMessage(address: string, timestamp: number): string {
  return `Sign this message to authenticate with GEXP Marketplace.

Address: ${address}
Timestamp: ${timestamp}

This action will not cost any fees.`;
}

// Sign message with wallet
async function signAuthMessage(user: GalachainUser): Promise<string> {
  const timestamp = Date.now();
  const message = createAuthMessage(user.address, timestamp);

  try {
    // Try Galachain extension first
    if (typeof window !== 'undefined' && (window as any).galachain) {
      return await (window as any).galachain.request({
        method: 'personal_sign',
        params: [message, user.address],
      });
    }
    // Fallback to Ethereum signing
    else if (typeof window !== 'undefined' && (window as any).ethereum) {
      return await (window as any).ethereum.request({
        method: 'personal_sign',
        params: [message, user.address],
      });
    }
    // Development fallback
    else {
      console.log('🔧 Development mode: Using mock signature');
      return `mock_signature_${timestamp}_${user.address.slice(0, 8)}`;
    }
  } catch (error: any) {
    console.error('Message signing failed:', error);
    throw new Error('Failed to sign authentication message');
  }
}

interface GalachainAuthProviderProps {
  children: ReactNode;
}

export function GalachainAuthProvider({
  children,
}: GalachainAuthProviderProps) {
  const [user, setUser] = useState<GalachainUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Load saved authentication state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('galachain_user');
    const savedToken = localStorage.getItem('galachain_jwt');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setJwtToken(savedToken);
      } catch (err) {
        console.error('Failed to restore auth state:', err);
        localStorage.removeItem('galachain_user');
        localStorage.removeItem('galachain_jwt');
      }
    }
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      console.log('🔗 Connecting to Galachain...');

      // Method 1: Try to connect via browser extension (similar to MetaMask)
      let user: GalachainUser | null = null;

      // Check for Galachain browser extension
      if (typeof window !== 'undefined' && (window as any).galachain) {
        console.log('🎮 Galachain extension detected!');
        user = await connectViaExtension();
      }
      // Method 2: Try WalletConnect for mobile/other wallets
      else if (typeof window !== 'undefined' && (window as any).ethereum) {
        console.log('💼 Using Ethereum-compatible wallet (fallback)');
        user = await connectViaEthereum();
      }

      // If no wallet detected, show error and do not connect
      if (!user) {
        setError(
          'No Galachain wallet or compatible Ethereum wallet detected. Please install the Gala Wallet extension or MetaMask and refresh the page.',
        );
        setIsConnecting(false);
        return;
      }

      console.log('👤 User connected:', user);

      // Sign authentication message
      console.log('✍️ Requesting message signature...');
      const signature = await signAuthMessage(user);
      console.log('✅ Message signed successfully');

      // Generate JWT token by calling our auth API
      const authResponse = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: user.address,
          publicKey: user.publicKey,
          signature: signature,
          timestamp: Date.now(),
        }),
      });

      if (!authResponse.ok) {
        const errorText = await authResponse.text();
        console.error('❌ Auth response error:', {
          status: authResponse.status,
          statusText: authResponse.statusText,
          body: errorText,
        });
        throw new Error(
          `Authentication failed: ${authResponse.status} ${authResponse.statusText}`,
        );
      }

      const authData = await authResponse.json();
      console.log('✅ Auth response received:', authData);

      const token = authData.data?.token;

      if (!token) {
        console.error('❌ No token in response:', authData);
        throw new Error('No authentication token received');
      }

      setUser(user);
      setJwtToken(token);

      // Save to localStorage
      localStorage.setItem('galachain_user', JSON.stringify(user));
      localStorage.setItem('galachain_jwt', token);

      console.log('✅ Connected to Galachain successfully');
    } catch (err: any) {
      console.error('❌ Galachain connection failed:', err);
      setError(err.message || 'Failed to connect to Galachain');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setUser(null);
    setJwtToken(null);
    setError(null);

    // Clear localStorage
    localStorage.removeItem('galachain_user');
    localStorage.removeItem('galachain_jwt');

    console.log('🔌 Disconnected from Galachain');
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // TODO: Implement actual message signing with Galachain SDK
    console.log('✍️ Signing message:', message);

    // Mock signature - replace with actual signing
    return `signature_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  };

  const getJWTToken = () => {
    return jwtToken;
  };

  const value: GalachainAuthContextType = {
    user,
    isAuthenticated,
    isConnecting,
    error,
    connect,
    disconnect,
    signMessage,
    getJWTToken,
  };

  return (
    <GalachainAuthContext.Provider value={value}>
      {children}
    </GalachainAuthContext.Provider>
  );
}

export function useGalachainAuth() {
  const context = useContext(GalachainAuthContext);
  if (context === undefined) {
    throw new Error(
      'useGalachainAuth must be used within a GalachainAuthProvider',
    );
  }
  return context;
}
