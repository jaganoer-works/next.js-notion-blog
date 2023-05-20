import { Html, Head, Main, NextScript } from "next/document";
import { SITE_META } from "@/constants/constants";

export default function Document() {
  const { siteLocale } = SITE_META;
  return (
    <Html lang={siteLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
