import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { SWRConfig } from 'swr';

import { darkTheme, lightTheme } from '../themes';

import { AuthProvider, CartProvider, UiProvider } from '../context';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import '../styles/globals.css';

// ============= Context to Theme
import { createContext, useState } from 'react';

type ThemeContextType = {
  themeDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeDark: false,
  toggleTheme: () => {},
});
// ===================

function MyApp({ Component, pageProps }: AppProps) {
  const [themeDark, setThemeDark] = useState(false);

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  return (
    // <SessionProvider session={session}>
    <SessionProvider >
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }} >

        <SWRConfig
          value={{
            // refreshInterval: 300, // Intervalos de tiempo para el refresh
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
          }}
        >
          <ThemeContext.Provider value={{ themeDark, toggleTheme }} >

            <AuthProvider>

              <CartProvider>

                <UiProvider>

                  <ThemeProvider theme={themeDark ? darkTheme : lightTheme} >
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>

                </UiProvider>

              </CartProvider>

            </AuthProvider>

          </ThemeContext.Provider>

        </SWRConfig>

      </PayPalScriptProvider>

    </SessionProvider>
  );
}

export default MyApp;
