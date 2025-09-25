/**
 * 🚨 Explorer Deactivation Notice
 * Temporary notice for deactivated explorer features
 */
import React from 'react';

interface ExplorerDeactivationNoticeProps {
  feature?: string;
  redirectUrl?: string;
}

const ExplorerDeactivationNotice: React.FC<ExplorerDeactivationNoticeProps> = ({
  feature = 'Explorer',
  redirectUrl = '/',
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* Main Icon */}
        <div className="text-6xl mb-4">🔧</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {feature} Temporarily Unavailable
        </h1>

        {/* Description */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p className="text-lg text-blue-800 dark:text-blue-200 mb-4">
            We&apos;re focusing on building the best NFT marketplace experience!
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            The {feature.toLowerCase()} functionality has been temporarily
            deactivated while we develop our comprehensive NFT marketplace. All
            data and functionality will be restored once marketplace development
            is complete.
          </p>
        </div>

        {/* What is Coming */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
            🚀 Coming Soon: GEXP Marketplace
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span>Multi-NFT Bundle Listings</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span>GEXP Reputation System</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span>Review & Rating System</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span>Competitive Trading Fees</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href={redirectUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ← Back to Marketplace
          </a>
          <a
            href="/nfts"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🎨 Explore NFTs
          </a>
        </div>

        {/* Technical Info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p>
            💡 <strong>For Developers:</strong> To reactivate explorer features,
            set{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              READ_CHAIN_DATA=true
            </code>{' '}
            in your .env file
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplorerDeactivationNotice;
