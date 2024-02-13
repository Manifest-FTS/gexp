'use client';

import Image from '@/components/ui/image';
import { ArrowUp } from '@/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StaticImageData } from 'next/image';
import { useTokenList } from '@/hooks/useCoin';

type CoinCardProps = {
  id: string;
  name: string;
  symbol: string;
  logo: StaticImageData;
  balance: string;
  usdBalance: string;
  change: string;
  color?: string;
};

export function CoinCard({
  name,
  symbol,
  logo,
  balance,
  usdBalance,
  change,
  color = '#FDEDD4',
}: CoinCardProps) {
  return (
    <div
      className="relative flex items-center gap-4 px-4 py-4 rounded-lg xl:py-0 "
      style={{ backgroundColor: color }}
    >
      <div className="relative w-16 h-20 rtl:order-2 lg:h-24 xl:h-32 xl:ml-4">
        <Image src={logo} alt={name} fill priority />
      </div>
      <div className="flex-1 mt-2 content xl:px-8">
        <div className="mb-2 text-sm font-medium tracking-wider text-gray-900 lg:text-lg 2xl:text-xl 3xl:text-2xl">
          {balance}
          <span className="uppercase"> {symbol}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs font-medium 2xl:text-sm">
          <span className="tracking-wider text-gray-600">{usdBalance} USD</span>
          {/* <span
            className={`flex items-center  ${
              change.includes('+') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span
              className={`ltr:mr-2 rtl:ml-2 ${
                !change.includes('+') ? 'rotate-180' : ''
              }`}
            >
              <ArrowUp />
            </span>
            {change}
          </span> */}
        </div>
      </div>
    </div>
  );
}

const sliderBreakPoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 24,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  1500: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

export default function CoinSlider() {
  const { tokens } = useTokenList();

  return (
    <div>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        dir="ltr"
      >
        {tokens.map((coin) => (
          <SwiperSlide key={coin.id}>
            <CoinCard
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              logo={coin.logo}
              balance={coin.balance}
              usdBalance={coin.usd}
              change={coin.change}
              color={coin.color}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
