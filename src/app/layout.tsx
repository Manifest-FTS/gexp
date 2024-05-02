// pages/_app.tsx
import { Component, Suspense } from 'react';
import { Fira_Code } from 'next/font/google';
import cn from 'classnames';
import { QueryClientProvider } from '@/app/shared/query-client-provider';
import { ThemeProvider } from '@/app/shared/theme-provider';
import WagmiConfig from '@/app/shared/wagmi-config';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { ClassicHeader } from '@/layouts/header/header';
import Sidebar from '@/layouts/sidebar/_expandable';

const fira_code = Fira_Code({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'GEXP',
  description: 'Galachain Explorer',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn('light', fira_code.className)}>
      <head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T5S4FJHN');
          `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T5S4FJHN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <QueryClientProvider>
          <ThemeProvider>
            <WagmiConfig>
              <SettingsButton />
              <SettingsDrawer />
              <Suspense fallback={null}>
                <ModalsContainer />
                <DrawersContainer />
              </Suspense>
              <div className="ltr:xl:pl-24 rtl:xl:pr-24 ltr:2xl:pl-28 rtl:2xl:pr-28 ">
                <ClassicHeader />
                <Sidebar className="hidden xl:block" />
                <main className="min-h-screen px-4 pb-4 pt-4 sm:px-6 sm:pb-4 lg:px-8 xl:pb-8 xl:pt-5 3xl:px-10">
                  {children}
                </main>
              </div>
            </WagmiConfig>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
