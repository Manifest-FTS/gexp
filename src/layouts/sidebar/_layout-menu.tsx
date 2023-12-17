// pages/layout-menu.tsx

import { Fragment } from 'react';
import Logo from '@/components/ui/logo';
import Button from '@/components/ui/button';
import ActiveLink from '@/components/ui/links/active-link';
import { Close } from '@/components/icons/close';
import { useDrawer } from '@/components/drawer-views/context';
import { ChevronDown } from '@/components/icons/chevron-down';
import { ChevronRight } from '@/components/icons/chevron-right';
import { defaultMenuItems } from '@/layouts/sidebar/_menu-items';
import { MenuItem } from '@/components/ui/collapsible-menu';
import WalletConnect from '@/components/nft/wallet-connect';
import routes from '@/config/routes';

interface DrawerMenuProps {
  menuItems?: any[];
}

export default function DrawerMenu({
  menuItems = defaultMenuItems,
}: DrawerMenuProps) {
  const { closeDrawer } = useDrawer();
  const drawerMenuItems = menuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: routes[item.href] || '',
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href: routes[dropdownItem.href] || '',
      })),
    }),
  }));

  return (
    <div className="relative w-full max-w-full bg-white dark:bg-dark xs:w-80">
      <div className="flex h-24 items-center justify-between overflow-hidden px-6 py-4">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar h-[calc(100%-180px)] overflow-hidden overflow-y-auto">
        <div className="px-6 pb-14 2xl:px-8">
          <div className="mt-2 sm:mt-4">
            {drawerMenuItems?.map((item, index) => (
              <MenuItem
                key={'drawer' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-0 z-10 w-full px-6">
        <WalletConnect anchorClassName="w-full" btnClassName="!w-full !h-11" />
      </div>
    </div>
  );
}
