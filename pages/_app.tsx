import { NextPage } from "next";
import Layout from "@/components/layout";
import "@/styles/globals.css";

type Props= {
  Component: NextPage;
  pageProps: any;
}

export default function App({ Component, pageProps }: Props) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
