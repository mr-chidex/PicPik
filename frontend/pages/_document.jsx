import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content="Get high quality inages for your designa and applications " />
        <meta name="keywords" content="photo, gallery" />
        <meta property="og:description" content="Get high quality inages for your designa and applications " />
        <meta property="og:title" content="Photo gallery" />
        <meta property="og:image" content="https://picpik.vercel.app/dexHome.jpg" />
        <meta property="og:site_name" content="Picpik" />
     
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
