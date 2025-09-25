/**
 * 🔗 Galachain Connect Button
 * Replaces MetaMask with Galachain authentication
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { useGalachainAuth } from '@/lib/context/galachain-auth';
import { GalaIcon } from '@/components/icons/gala';

interface GalachainConnectButtonProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'pill' | 'circle';
}

export default function GalachainConnectButton({
  className,
  size = 'medium',
  shape = 'rounded',
}: GalachainConnectButtonProps) {
  const { user, isAuthenticated, isConnecting, error, connect, disconnect } =
    useGalachainAuth();
  const [showDetails, setShowDetails] = useState(false);

  const handleConnect = async () => {
    if (isAuthenticated) {
      setShowDetails(!showDetails);
    } else {
      await connect();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDetails(false);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <Button
          className={className}
          size={size}
          shape={shape}
          onClick={handleConnect}
          disabled={isConnecting}
        >
          <div className="flex items-center gap-2">
            <GalaIcon className="h-5 w-5" />
            <span>
              {user.profile?.username || truncateAddress(user.address)}
            </span>
          </div>
        </Button>

        {showDetails && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg bg-white p-4 shadow-large dark:bg-gray-800">
            <div className="mb-3">
              <div className="flex items-center gap-3 mb-2">
                {user.profile?.avatar && (
                  <Image
                    src={user.profile.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {user.profile?.username || 'Galachain User'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {truncateAddress(user.address)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-3 dark:border-gray-700">
              <Button
                size="small"
                variant="ghost"
                onClick={handleDisconnect}
                className="w-full text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Disconnect
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      className={className}
      size={size}
      shape={shape}
      onClick={handleConnect}
      disabled={isConnecting}
    >
      <div className="flex items-center gap-2">
        <GalaIcon className="h-5 w-5" />
        <span>{isConnecting ? 'Connecting...' : 'Connect Galachain'}</span>
      </div>
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
          {error}
        </div>
      )}
    </Button>
  );
}
