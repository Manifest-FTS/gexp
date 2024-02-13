import client from '@/data/utils';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import {
  APIResponse,
  BlockHourListResponse,
  BlockListResponse,
  ChannelBlockListResponse,
  ChannelListResponse,
  CoinPaginator,
  CoinPrice,
  CryptoQueryOptions,
  TokenPriceListResponse,
  TransactionListResponse,
} from '@/types';
import type { UseInfiniteQueryOptions } from 'react-query';
import { useRouter } from 'next/router';
import { useQuery, useInfiniteQuery } from 'react-query';
import { formatTokenData } from '@/data/static/coin-slide-data';
import { addMinutes, format } from 'date-fns';
import { useEffect, useState } from 'react';

export function useCoins(
  options?: Partial<CryptoQueryOptions>,
  config?: UseInfiniteQueryOptions<CoinPaginator, Error>,
) {
  const { locale } = useRouter();

  const formattedOptions = {
    ...options,
    language: locale,
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<CoinPaginator, Error>(
    [API_ENDPOINTS.PRICING, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.coins.all(Object.assign({}, queryKey[1], pageParam)),
    {
      ...config,
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    },
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    coins: data?.pages[0],
    paginatorInfo: Array.isArray(data?.pages)
      ? data?.pages[data.pages.length - 1]
      : null,
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
  };
}

export function useCoin(id: string) {
  const { locale: language } = useRouter();

  // console.log({ slug, language });

  const { data, isLoading, error } = useQuery<CoinPrice, Error>(
    [API_ENDPOINTS.PRICING, { id, language }],
    () => client.coins.get({ id, language }),
  );

  return {
    coin: data,
    isLoading,
    error,
  };
}

export function useMarketChart(id: string) {
  const { locale: language } = useRouter();

  const { data, isLoading, error } = useQuery<CoinPrice, Error>(
    [API_ENDPOINTS.PRICING, { id, language }],
    () => client.marketChart.get({ id, language }),
  );

  return {
    chart: data,
    isLoading,
    error,
  };
}

export function useTokenList() {
  const { data, isLoading, error } = useQuery<TokenPriceListResponse, Error>(
    [API_ENDPOINTS.TOKEN_PRICE_LIST],
    () => client.token.list(),
  );

  return {
    tokens: formatTokenData(data?.data),
    isLoading,
    error,
  };
}

export function useBlockHourList() {
  const { data, isLoading, error } = useQuery<BlockHourListResponse, Error>(
    [API_ENDPOINTS.BLOCK_HOUR_LIST],
    () => client.charts.getBlockHourList(),
    { refetchInterval: 60000 },
  );

  const parsedResponse = data?.data.map(({ hour, count }, index) => ({
    name: format(
      addMinutes(new Date(hour), new Date(hour).getTimezoneOffset()),
      'dd/MM/yy, HH:mm',
    ), //dd/MM/yy,
    blockCount: +count,
  }));

  return {
    data: parsedResponse || [],
    loading: isLoading,
    error,
  };
}

export function useChannelBlockList() {
  const { data, isLoading, error } = useQuery<ChannelBlockListResponse, Error>(
    [API_ENDPOINTS.CHANNEL_BLOCK_LIST],
    () => client.charts.getChannelBlockList(),
    { refetchInterval: 60000 },
  );

  function generateHex(number: number, total: number) {
    const opacity = number / total;
    const finalOpacityHex = Math.max(Math.round(opacity * 255), 25).toString(
      16,
    );

    const rgbaColor = `#8884d8${finalOpacityHex}`;

    return rgbaColor;
  }

  const parsedResponse = data?.data.map(
    ({ channelName, blockCount }, index) => ({
      name: channelName,
      value: +blockCount,
      fill: generateHex(index, data?.data.length),
    }),
  );

  return {
    data: parsedResponse || [],
    loading: isLoading,
    error,
  };
}

export function useBlockList(limit: number, page: number) {
  const { data, isLoading, error } = useQuery<BlockListResponse, Error>(
    [API_ENDPOINTS.BLOCK_LIST, { limit, page }],
    () => client.latest.getBlockList({ limit, page }),
  );

  return {
    latestBlocks: data?.data.data || [],
    loadingBlocks: isLoading,
    error,
  };
}

export function useTransactionList(limit: number, page: number) {
  const { data, isLoading, error } = useQuery<TransactionListResponse, Error>(
    [API_ENDPOINTS.TRANSACTION_LIST, { limit, page }],
    () => client.latest.getTransactionList({ limit, page }),
  );

  return {
    latestTransaction: data?.data.data || [],
    loadingTransactions: isLoading,
    error,
  };
}

export function useChannelList() {
  const { data } = useQuery<ChannelListResponse, Error>(
    [API_ENDPOINTS.CHANNEL_LIST],
    () => client.channel.get(),
  );

  return data?.data;
}

export function useGlobalSearch(query: string) {
  const [payload, setPayload] = useState({
    limit: 10,
    offset: 0,
    search: '',
  });
  useEffect(() => {
    if (payload.search !== query) {
      const timerId = setTimeout(
        () => setPayload((e) => ({ ...e, search: query })),
        1000,
      );
      return () => clearTimeout(timerId);
    }
  }, [query]);

  const { error, isLoading, data } = useQuery<any, Error>(
    [API_ENDPOINTS.GLOBAL_SEARCH, payload],
    () => client.global.search(payload),
    { enabled: !payload.search.includes('`block: OR'), retry: 0 },
  );

  return { searchData: data?.data, isLoading };
}
