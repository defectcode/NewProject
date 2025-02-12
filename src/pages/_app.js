// _app.js
import '../app/globals.css';
import '@fontsource/inter'; 
import Head from 'next/head'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/icons/faviconpng.png" type="image/png" />
        <title>Paradise Problems</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
