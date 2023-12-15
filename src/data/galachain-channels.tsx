// channels.ts
import { GalaIcon } from '@/components/icons/gala';
// ... import other icons for each channel

import routes from '@/config/routes';

export const galaChannels = [
  {
    name: 'All',
    icon: <GalaIcon />, // Use an appropriate icon
    href: routes.all,
  },
  {
    name: 'Asset Channel',
    icon: <GalaIcon />,
    href: routes.assetChannel,
  },
  {
    name: 'Battlestar Galactica Eternity',
    icon: <GalaIcon />, // Replace with actual icon
    href: routes.battlestar,
  },
  {
    name: 'Champions Arena',
    icon: <GalaIcon />, // Replace with actual icon
    href: routes.championsArena,
  },
  {
    name: 'Echoes of Empire',
    icon: <GalaIcon />, // Replace with actual icon
    href: routes.echoesEmpire,
  },
  {
    name: 'Spider Tanks',
    icon: <GalaIcon />, // Replace with actual icon
    href: routes.spiderTanks,
  },
];

export default galaChannels;
