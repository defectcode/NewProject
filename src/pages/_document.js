import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Ek+Mukta:wght@400&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
          <link
          href="https://fonts.googleapis.com/css2?family=Ek+Mukta:wght@200;400;700&display=swap"
          rel="stylesheet"
          />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /> */}


          <style
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  --font-family-ek-mukta: 'Ek Mukta', sans-serif;
                  --font-family-avenir-roman: 'Avenir', sans-serif;
                  --font-family-avenir-heavy: 'Avenir', sans-serif;
                }
              `,
            }}
          />
          <link
            rel="preload"
            href="/fonts/Avenir-Roman.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Avenir-Heavy.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
