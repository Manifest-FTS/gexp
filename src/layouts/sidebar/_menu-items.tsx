import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { DiskIcon } from '@/components/icons/disk';
import { CompassIcon } from '@/components/icons/compass';
import { GalaIcon } from '@/components/icons/gala';

export const defaultMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Explorer',
    icon: <GalaIcon />,
    href: '#', // This can be '#' if it's only a dropdown trigger
    dropdownItems: [
      {
        name: 'Transactions',
        href: routes.transactions, // Update with the correct route
      },
      {
        name: 'Blocks',
        href: routes.blocks, // Update with the correct route
      },
    ],
  },
  {
    name: 'NFTs',
    icon: <CompassIcon />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Explore NFTs',
        icon: <CompassIcon />,
        href: routes.nfts,
      },
      {
        name: 'Create Listing',
        icon: <DiskIcon />,
        href: routes.create,
      },
    ],
  },
];
