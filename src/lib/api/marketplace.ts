/**
 * 🔌 GEXP Marketplace API Client
 * Centralized API functions for the NFT marketplace
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types for API responses
export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image_url: string;
  banner_url: string;
  creator_address: string;
  contract_address: string;
  total_supply: number;
  floor_price: number;
  total_volume: number;
  channel_name?: string;
  is_galachain_native?: boolean;
  created_at: string;
  updated_at: string;
}

export interface NFTItem {
  id: string;
  collection_id: string;
  token_id: string;
  chain_id: string;
  name: string;
  description: string;
  image_url: string;
  owner_address: string;
  creator_address: string;
  attributes: any;
  rarity_score: number;
  rarity_rank?: number;
  is_locked_in_game: boolean;
  is_galachain_native?: boolean;
  created_at: string;
  updated_at: string;
  // Joined data
  nft_collections?: NFTCollection;
  nft_listings?: NFTListing[];
}

export interface NFTListing {
  id: string;
  nft_item_id: string;
  seller_address: string;
  price: string;
  currency: string;
  listing_type: string;
  status: string;
  start_time: string;
  end_time?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  nft_items?: NFTItem;
}

export interface BundleListing {
  id: string;
  seller_address: string;
  title: string;
  description: string;
  total_price: string;
  currency: string;
  status: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  bundle_listing_items?: {
    nft_item_id: string;
    nft_items: NFTItem;
  }[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

// API Client Class
class GEXPMarketplaceAPI {
  // Create a new marketplace listing
  async createListing({
    nft_item_id,
    seller_address,
    price,
    currency,
    listing_type,
    description,
    unlockable_content,
    jwt,
  }: {
    nft_item_id: string;
    seller_address: string;
    price: number;
    currency: string;
    listing_type: string;
    description?: string;
    unlockable_content?: string;
    jwt: string;
  }) {
    return this.request('/marketplace/listings', {
      method: 'POST',
      body: JSON.stringify({
        nft_item_id,
        seller_address,
        price,
        currency,
        listing_type,
        description,
        unlockable_content,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // NFT Collections
  async getAllCollections(params?: {
    page?: number;
    limit?: number;
    search?: string;
    creator_address?: string;
    sort_by?: string;
    order?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{
      collections: NFTCollection[];
      pagination: PaginationInfo;
    }>(`/nft/collections?${queryParams}`);
  }

  async getCollectionById(id: string) {
    return this.request<{ collection: NFTCollection }>(
      `/nft/collections/${id}`,
    );
  }

  async getCollectionStats(id: string) {
    return this.request<{
      total_items: number;
      floor_price: number;
      total_volume: number;
      total_sales: number;
      unique_owners: number;
    }>(`/nft/collections/${id}/stats`);
  }

  // NFT Items
  async getAllNFTs(params?: {
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
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{
      items: NFTItem[];
      pagination: PaginationInfo;
    }>(`/nft/items?${queryParams}`);
  }

  async getNFTById(id: string) {
    return this.request<{ item: NFTItem }>(`/nft/items/${id}`);
  }

  async getNFTHistory(id: string) {
    return this.request<{
      history: any[];
    }>(`/nft/items/${id}/history`);
  }

  // Marketplace Listings
  async getAllListings(params?: {
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
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{
      listings: NFTListing[];
      pagination: PaginationInfo;
    }>(`/marketplace/listings?${queryParams}`);
  }

  async getListingById(id: string) {
    return this.request<{ listing: NFTListing }>(`/marketplace/listings/${id}`);
  }

  async getMarketplaceStats() {
    return this.request<{
      active_listings: number;
      floor_price: number;
      volume: {
        '24h': number;
        '7d': number;
        '30d': number;
      };
      sales: {
        '24h': number;
        '7d': number;
        '30d': number;
      };
      avg_price: {
        '24h': number;
        '7d': number;
        '30d': number;
      };
    }>('/marketplace/stats');
  }

  // Bundle Listings
  async getAllBundles(params?: {
    page?: number;
    limit?: number;
    search?: string;
    seller_address?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    order?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{
      bundles: BundleListing[];
      pagination: PaginationInfo;
    }>(`/bundles?${queryParams}`);
  }

  async getBundleById(id: string) {
    return this.request<{ bundle: BundleListing }>(`/bundles/${id}`);
  }

  // Galachain Integration
  async getGalachainChannels() {
    return this.request<{
      channels: {
        id: number;
        name: string;
        channel_key: string;
        display_name: string;
      }[];
    }>('/galachain/channels');
  }

  async getGalachainSyncStatus() {
    return this.request<{
      total_galachain_collections: number;
      total_galachain_items: number;
      channels: any;
      last_global_sync: string | null;
    }>('/galachain/sync/status');
  }
}

// Export singleton instance
export const marketplaceAPI = new GEXPMarketplaceAPI();

// Export types and API instance
export default marketplaceAPI;
