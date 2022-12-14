import Document, { Head, Html, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";

const emotionCache = createCache({
  key: "css",
});

const APP_NAME = "Andrew Kamau";

const { extractCritical } = createEmotionServer(emotionCache);

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      ...styles,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" key="charset" />
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />

          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"true"}
          />
          <link
            href={
              "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap"
            }
            rel={"stylesheet"}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={"system"} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
