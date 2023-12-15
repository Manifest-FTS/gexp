//images
import BitcoinImage from '@/assets/images/coin/bitcoin.svg';
import TetherImage from '@/assets/images/coin/tether.svg';
import GalaImage from '@/assets/images/coin/gala.svg';
import BinanceImage from '@/assets/images/coin/binance.svg';

export const coinSlideData = [
  {
    id: '0',
    name: 'Gala',
    symbol: 'GALA',
    balance: '1.2370',
    usdBalance: '532.94',
    logo: GalaImage,
    change: '+12.5%',
    isChangePositive: true,
    color: '#DBE3FF',
  },
  {
    id: '1',
    name: 'Tether',
    symbol: 'USDT',
    balance: '1.2345',
    usdBalance: '1,032.24',
    logo: TetherImage,
    change: '-1.5%',
    isChangePositive: false,
    color: '#E1F9F1',
  },
  {
    id: '2',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '0.2231345',
    usdBalance: '11,032.24',
    logo: BitcoinImage,
    change: '+12.5%',
    isChangePositive: true,
    color: '#FDEDD4',
  },
  {
    id: '3',
    name: 'Binance',
    symbol: 'BUSD',
    balance: '240.55',
    usdBalance: '340.24',
    logo: BinanceImage,
    change: '+1.5%',
    isChangePositive: true,
    color: '#FBF5D5',
  },
];
