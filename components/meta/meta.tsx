import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_META } from "@/constants/constants";

type MetaProps = {
  pageTitle?: string;
  pageDesc?: string;
};

const Meta = ({ pageTitle, pageDesc }: MetaProps) => {
  const { siteTitle, siteDesc, siteURL, siteType, siteLocale, siteIcon } =
    SITE_META;
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  const desc = pageDesc ?? siteDesc;
  const router = useRouter();
  const url = `${siteURL}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={siteType} />
      <meta property="og:locale" content={siteLocale} />
      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />
      {/* TODO: OGP画像を追加する */}
    </Head>
  );
};

export default Meta;
