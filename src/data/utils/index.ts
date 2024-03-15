/* eslint-disable import/no-anonymous-default-export */
import { HttpClient } from '@/data/utils/client';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import type {
  BlockDetailResponse,
  BlockHourListResponse,
  BlockListResponse,
  ChannelBlockListResponse,
  ChannelListResponse,
  CoinPaginator,
  CoinPrice,
  CryptoQueryOptions,
  GetBlockDetailParams,
  GetLatestParams,
  GetParams,
  GlobalSearchParams,
  Settings,
  SettingsQueryOptions,
  TokenPriceListResponse,
  TransactionDetailResponse,
  TransactionListResponse,
} from '@/types';

class client {
  coins = {
    all: ({ id, name, symbol, ...query }: Partial<CryptoQueryOptions> = {}) =>
      HttpClient.get<CoinPaginator>(API_ENDPOINTS.MARKETS, {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '10000',
        page: '1',
        sparkline: 'false',
        price_change_percentage: '1h,24h,7d',
        ...query,
      }),
    get: ({ id }: GetParams) =>
      HttpClient.get<CoinPrice>(`${API_ENDPOINTS.PRICING}/${id}`),
  };

  token = {
    list: () =>
      HttpClient.get<TokenPriceListResponse>(
        `${API_ENDPOINTS.TOKEN_PRICE_LIST}?ids=gala%2Cgala-music%2Cmaterium%2Csilk%2Cbitcoin&vs_currencies=usd`,
      ),
  };

  latest = {
    getBlockList: ({ limit, page, channelId }: GetLatestParams) =>
      HttpClient.get<BlockListResponse>(
        `${API_ENDPOINTS.BLOCK_LIST}?limit=${limit}&page=${page}&channelId=${channelId}`,
      ),
    getBlockDetail: ({ blockNumber, channelId }: GetBlockDetailParams) =>
      HttpClient.get<BlockDetailResponse>(
        `${API_ENDPOINTS.BLOCK_DETAIL}?blockNumber=${blockNumber}&channelId=${channelId}`,
      ),
    getTransactionList: ({ limit, page, channelId }: GetLatestParams) =>
      HttpClient.get<TransactionListResponse>(
        `${API_ENDPOINTS.TRANSACTION_LIST}?limit=${limit}&page=${page}&channelId=${channelId}`,
      ),
    getTransactionDetail: ({ txId }: { txId: string }) =>
      HttpClient.get<TransactionDetailResponse>(
        `${API_ENDPOINTS.TRANSACTION_DETAIL}?txId=${txId}`,
      ),
  };

  charts = {
    getBlockHourList: (interval: string) =>
      HttpClient.get<BlockHourListResponse>(
        `${API_ENDPOINTS.BLOCK_HOUR_LIST}?interval=${interval}`,
      ),
    getChannelBlockList: (interval: string) =>
      HttpClient.get<ChannelBlockListResponse>(
        `${API_ENDPOINTS.CHANNEL_BLOCK_LIST}?interval=${interval}`,
      ),
  };

  channel = {
    get: () =>
      HttpClient.get<ChannelListResponse>(`${API_ENDPOINTS.CHANNEL_LIST}`),
  };

  marketChart = {
    get: ({ id }: GetParams) =>
      HttpClient.get<CoinPrice>(
        `${API_ENDPOINTS.PRICING}/${id}/market_chart?vs_currency=usd&days=30`,
      ),
  };

  settings = {
    all: (params?: SettingsQueryOptions) =>
      HttpClient.get<Settings>(API_ENDPOINTS.SETTINGS, { ...params }),
  };

  global = {
    search: (data: GlobalSearchParams) =>
      HttpClient.post<any>(API_ENDPOINTS.GLOBAL_SEARCH, data),
  };
}

export default new client();
