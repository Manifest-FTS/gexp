'use client';

import React from 'react';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import ErrorLightImage from '@/assets/images/404-light.svg';
import ErrorDarkImage from '@/assets/images/404-dark.svg';

export default function NotFoundPage() {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <div>
      <div className="flex max-w-full flex-col items-center justify-center text-center">
        <div className="relative w-52 max-w-full sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
          {isMounted && !isDarkMode && (
            <Image src={ErrorLightImage} alt="404 Error" />
          )}
          {isMounted && isDarkMode && (
            <Image src={ErrorDarkImage} alt="404 Error" />
          )}
        </div>

        <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
          Sorry, It's a work in progress
        </h2>
        <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
          This page is under construction, we are working to deliver this to
          you.
        </p>
        <AnchorLink href={{ pathname: routes.home }}>
          <Button shape="rounded">Back to Home</Button>
        </AnchorLink>
      </div>
    </div>
  );
}
