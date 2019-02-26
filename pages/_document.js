import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <style>
            {`
            body,
            html {
              margin: 0;
              padding: 0;
              height: 100%;
            }
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif;
            }
          `}
          </style>
          <script
            async
            src={'//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: 'ca-pub-5463431411010001',
              enable_page_level_ads: true
            });
            `
            }}
          />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
