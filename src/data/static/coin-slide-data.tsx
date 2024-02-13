//images
import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import GalaImage from '@/assets/images/coin/gala.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';
import { TokenPriceData } from '@/types';

const coinSlideData: any = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 1,
    change: '-12.5%',
    logo: BitcoinImage,
    color: '#FDEDD4',
  },
  gala: {
    name: 'Gala',
    symbol: 'GALA',
    balance: 1,
    logo: GalaImage,
    change: '+12.5%',
    color: '#DBE3FF',
  },
  'gala-music': {
    name: 'Gala Music',
    symbol: 'GALA-MUSIC',
    balance: 1,
    logo: GalaImage,
    change: '-17.6',
    color: '#E4CAC9',
  },
  materium: {
    name: 'Materium',
    symbol: 'MATERIUM',
    balance: 1,
    logo: GalaImage,
    change: '-86.5',
    color: '#E1F9F1',
  },
  silk: {
    name: 'Silk',
    symbol: 'SILK',
    balance: 1,
    logo: GalaImage,
    change: '+2.20',
    color: '#FBF5D5',
  },
};

const invalidValue = (value: string) => ({
  name: value,
  symbol: value.toUpperCase(),
  balance: 1,
  change: '+00.00',
  color: '#FBF5D5',
});

export const formatTokenData = (
  array: [string, TokenPriceData][] | undefined,
) => {
  if (!array) return [];
  return array.map(([id, value]) => ({
    ...(coinSlideData?.[id] || invalidValue(id)),
    ...value,
    id,
  }));
};

// export const coinSlideData = [
//   {
//     id: '0',
//     name: 'Gala',
//     symbol: 'GALA',
//     balance: '1.2370',
//     usdBalance: '532.94',
//     logo: GalaImage,
//     change: '+12.5%',
//     isChangePositive: true,
//     color: '#DBE3FF',
//   },
//   {
//     id: '1',
//     name: 'Tether',
//     symbol: 'USDT',
//     balance: '1.2345',
//     usdBalance: '1,032.24',
//     logo: TetherImage,
//     change: '-1.5%',
//     isChangePositive: false,
//     color: '#E1F9F1',
//   },
//   {
//     id: '2',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     balance: '0.2231345',
//     usdBalance: '11,032.24',
//     logo: BitcoinImage,
//     change: '+12.5%',
//     isChangePositive: true,
//     color: '#FDEDD4',
//   },
//   {
//     id: '3',
//     name: 'Binance',
//     symbol: 'BUSD',
//     balance: '240.55',
//     usdBalance: '340.24',
//     logo: BinanceImage,
//     change: '+1.5%',
//     isChangePositive: true,
//     color: '#FBF5D5',
//   },
// ];
