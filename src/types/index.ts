import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export type CoinTypes = {
  icon: JSX.Element;
  code: string;
  name: string;
  price: number;
};

export interface Attachment {
  id: string;
  original: string;
  thumbnail: string;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  language?: string;
}

export interface GetParams {
  id: string;
  language?: string;
}
export interface GetLatestParams {
  limit: number;
  page: number;
  blockNumber?: string;
  channelId?: number;
}

export interface GetBlockDetailParams {
  blockNumber: string;
  channelId: string;
}

export interface GlobalSearchParams {
  limit: number;
  offset: number;
  search: string;
}

export interface SearchParamOptions {
  rating: string;
  question: string;

  [key: string]: unknown;
}

export interface CryptoQueryOptions extends QueryOptions {
  id: string;
  name: string;
  symbol: string;
}

export interface SettingsQueryOptions extends QueryOptions {
  language?: string;
}

export interface Prices {
  name: number;
  value: number;
}

export interface CoinPrice {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: string;
  market_cap_rank: string;
  fully_diluted_valuation: string;
  total_volume: string;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: string;
  max_supply: string;
  prices?: Prices[];
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  // map: any;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface CoinPaginator extends PaginatorInfo<CoinPrice> {}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: Attachment;
  twitterHandle: string;
  twitterCardType: string;
  metaTags: string;
  canonicalUrl: string;
}

export interface Settings {
  id: string;
  options: {
    siteTitle: string;
    siteSubtitle: string;
    currency: string;
    logo: Attachment;
    seo: SEO;
    contactDetails: ContactDetails;
    useOtp: Boolean;
    [key: string]: string | any;
  };
}

export interface ContactDetails {
  contact: string;
  location: Location;
  website: string;
}

export interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ListResponse<T> {
  len: number;
  data: T[];
}

export interface BlockListResponse
  extends APIResponse<ListResponse<BlockData>> {}

export interface BlockDetailResponse extends APIResponse<BlockDetailData> {}

export interface TransactionDetailResponse
  extends APIResponse<TransactionDetailData> {}

export interface TransactionListResponse
  extends APIResponse<ListResponse<TransactionData>> {}

export interface ChannelListResponse extends APIResponse<ChannelData[]> {}

export interface TokenPriceListResponse
  extends APIResponse<[string, TokenPriceData][]> {}

export interface BlockHourListResponse extends APIResponse<BlockHourData[]> {}

export interface ChannelBlockListResponse
  extends APIResponse<ChannelBlockData[]> {}

export interface ChannelBlockData {
  channelId: number;
  channelName: string;
  blockCount: string;
}
export interface BlockDetailData {
  data: { rawData: string };
}
export interface TransactionDetailData {
  data: {
    rawData: RawData;
    blockNumber: number;
    channelId: number;
    createdAt: string;
  };
}
export interface BlockHourData {
  hour: string;
  count: string;
}
export interface TokenPriceData {
  usd: string;
}
export interface ChannelData {
  channelId: number;
  color: string;
  channelName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlockData {
  blockNumber: number;
  channelId: number;
  txCount: number;
  executes: string[];
  created: string;
  channel: Channel;
}

export interface TransactionData {
  txId: string;
  channelId: number;
  blockNumber: number;
  blockType: string;
  valid: string;
  created: string;
  arg: string;
  channel: Channel;
}

export interface Channel {
  channelName: string;
}

export interface RawData {
  actions: Action[];
  creator: Creator;
  id: string;
  type: string;
  validationCode: ValidationCode;
}

export interface Action {
  args: string[];
  chaincode: Chaincode;
  chaincodeResponse: ChaincodeResponse;
  endorserMsps: string[];
  reads: Read[];
  writes: Write[];
}

export interface Chaincode {
  name: string;
  version: string;
}

export interface ChaincodeResponse {
  status: number;
  message: string;
  payload: string;
}

export interface Read {
  key: string;
}

export interface Write {
  isDelete: boolean;
  key: string;
  value: string;
}

export interface Creator {
  mspId: string;
  name: string;
}

export interface ValidationCode {
  transactionId: string;
  validationCode: number;
  validationEnum: string;
}
