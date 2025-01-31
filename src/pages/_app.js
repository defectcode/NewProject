// _app.js
import '../app/globals.css';
import '@fontsource/inter'; 
import Head from 'next/head'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/faviconpng.png" type="image/png" />
        <title>Paradise Problems</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
