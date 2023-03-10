import CartContext from "../components/CartContext";
import { createClient, Provider } from "urql";
import {
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { extendTheme as extendJoyTheme } from "@mui/joy/styles";
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const client = createClient({
  url: "https://skin-therapy-6413.myshopify.com/api/2023-01/graphql.json",
  fetchOptions: () => {
    const token = "6ed49a8426a76f3ebfce089ee7b70f69";
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${token}`,
      },
    };
  },
});

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider value={client}>
          <CartContext>
            <Component {...pageProps} />
          </CartContext>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
