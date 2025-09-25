/**
 * 🪝 GEXP Marketplace React Hooks
 * Custom hooks for fetching marketplace data with loading states
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  marketplaceAPI,
  NFTItem,
  NFTListing,
  BundleListing,
  NFTCollection,
  PaginationInfo,
} from '@/lib/api/marketplace';

// Generic hook type for paginated data
interface UsePaginatedDataResult<T> {
  data: T[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

// Hook for NFT listings (marketplace data)
export function useNFTListings(params?: {
  page?: number;
  limit?: number;
  search?: string;
  collection_id?: string;
  seller_address?: string;
  min_price?: number;
  max_price?: number;
  currency?: string;
  listing_type?: string;
  sort_by?: string;
  order?: string;
}): UsePaginatedDataResult<NFTListing> {
  const [data, setData] = useState<NFTListing[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Serialize params to prevent unnecessary re-renders
  const paramsKey = JSON.stringify(params || {});

  const fetchData = useCallback(
    async (reset = false) => {
      console.log('🔄 Fetching NFT listings:', { params, reset });
      try {
        setLoading(true);
        setError(null);

        const response = await marketplaceAPI.getAllListings(params);

        if (response.status === 'SUCCESS') {
          console.log(
            '✅ NFT listings fetched successfully:',
            response.data.listings.length,
            'items',
          );
          setData((prevData) =>
            reset
              ? response.data.listings
              : [...prevData, ...response.data.listings],
          );
          setPagination(response.data.pagination);
        } else {
          console.error('❌ API error:', response.message);
          setError(response.message);
        }
      } catch (err: any) {
        console.error('❌ Fetch error:', err);
        setError(err.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    },
    [paramsKey],
  );

  const refresh = useCallback(() => {
    console.log('🔄 Refreshing NFT listings');
    fetchData(true);
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (pagination && pagination.page < pagination.totalPages) {
      console.log('📄 Loading more NFT listings');
      const nextPageParams = { ...params, page: pagination.page + 1 };
      // Update params and fetch
    }
  }, [pagination, params]);

  useEffect(() => {
    console.log('🎯 useNFTListings effect triggered with params:', params);
    fetchData(true);
  }, [paramsKey]);

  return {
    data,
    pagination,
    loading,
    error,
    refresh,
    loadMore,
    hasMore: pagination ? pagination.page < pagination.totalPages : false,
  };
}

// Hook for NFT items (all NFTs, not just listings)
export function useNFTItems(params?: {
  page?: number;
  limit?: number;
  search?: string;
  collection_id?: string;
  owner_address?: string;
  min_rarity?: number;
  max_rarity?: number;
  is_locked?: boolean;
  sort_by?: string;
  order?: string;
}): UsePaginatedDataResult<NFTItem> {
  const [data, setData] = useState<NFTItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);

        const response = await marketplaceAPI.getAllNFTs(params);

        if (response.status === 'SUCCESS') {
          setData((prevData) =>
            reset ? response.data.items : [...prevData, ...response.data.items],
          );
          setPagination(response.data.pagination);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch NFT items');
      } finally {
        setLoading(false);
      }
    },
    [params],
  );

  const refresh = () => fetchData(true);
  const loadMore = () => {
    if (pagination && pagination.page < pagination.totalPages) {
      // Implementation for loading more pages
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    refresh,
    loadMore,
    hasMore: pagination ? pagination.page < pagination.totalPages : false,
  };
}

// Hook for NFT collections
export function useNFTCollections(params?: {
  page?: number;
  limit?: number;
  search?: string;
  creator_address?: string;
  sort_by?: string;
  order?: string;
}): UsePaginatedDataResult<NFTCollection> {
  const [data, setData] = useState<NFTCollection[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);

        const response = await marketplaceAPI.getAllCollections(params);

        if (response.status === 'SUCCESS') {
          setData((prevData) =>
            reset
              ? response.data.collections
              : [...prevData, ...response.data.collections],
          );
          setPagination(response.data.pagination);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch collections');
      } finally {
        setLoading(false);
      }
    },
    [params],
  );

  const refresh = () => fetchData(true);
  const loadMore = () => {
    if (pagination && pagination.page < pagination.totalPages) {
      // Implementation for loading more pages
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    refresh,
    loadMore,
    hasMore: pagination ? pagination.page < pagination.totalPages : false,
  };
}

// Hook for bundle listings
export function useBundleListings(params?: {
  page?: number;
  limit?: number;
  search?: string;
  seller_address?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  order?: string;
}): UsePaginatedDataResult<BundleListing> {
  const [data, setData] = useState<BundleListing[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);

        const response = await marketplaceAPI.getAllBundles(params);

        if (response.status === 'SUCCESS') {
          setData((prevData) =>
            reset
              ? response.data.bundles
              : [...prevData, ...response.data.bundles],
          );
          setPagination(response.data.pagination);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch bundles');
      } finally {
        setLoading(false);
      }
    },
    [params],
  );

  const refresh = () => fetchData(true);
  const loadMore = () => {
    if (pagination && pagination.page < pagination.totalPages) {
      // Implementation for loading more pages
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    refresh,
    loadMore,
    hasMore: pagination ? pagination.page < pagination.totalPages : false,
  };
}

// Hook for marketplace statistics
export function useMarketplaceStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await marketplaceAPI.getMarketplaceStats();

      if (response.status === 'SUCCESS') {
        setStats(response.data);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch marketplace stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats };
}

// Hook for single NFT item
export function useNFTItem(id: string) {
  const [item, setItem] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItem = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await marketplaceAPI.getNFTById(id);

      if (response.status === 'SUCCESS') {
        setItem(response.data.item);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch NFT item');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return { item, loading, error, refresh: fetchItem };
}
