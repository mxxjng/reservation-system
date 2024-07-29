import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";

import "~/styles/globals.css";

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    brand: [
      "#fff8e1",
      "#ffefcc",
      "#ffdd9b",
      "#ffca64",
      "#ffba38",
      "#ffb01b",
      "#ffab09",
      "#e39500",
      "#ca8500",
      "#af7100",
    ],
    dark: [
      "#C3C4D0",
      "#AEB1C1",
      "#727792",
      "#5B5F76",
      "#424857",
      "#2C303A",
      "#21242C",
      "#181A20",
      "#0F1114",
      "#070709",
    ],
  },
  fontFamily: "Inter, sans-serif",
  headings: { fontFamily: "DM Sans" },
  primaryColor: "brand",
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Notifications />
        <NextIntlClientProvider locale={router.locale} messages={pageProps.messages}>
          {getLayout(<Component {...pageProps} />)}
        </NextIntlClientProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
