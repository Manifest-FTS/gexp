'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from 'react-query';

export function QueryClientProvider({ children }: React.PropsWithChildren<{}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  );
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
