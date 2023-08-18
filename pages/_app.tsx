import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import { lightTheme } from '../themes';

import '../styles/globals.css';
import { CartProvider, UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 300, // Intervalos de tiempo para el refresh
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
      }}
    >
      <CartProvider>

        <UiProvider>

          <ThemeProvider theme={lightTheme} >
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>

        </UiProvider>

      </CartProvider>

    </SWRConfig>
  );
}

export default MyApp;
