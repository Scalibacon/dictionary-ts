import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dictionary Fino Señores</title>
        <meta name="description" content="English dictionary made by ScaliDev" />
      </Head>

      <Component {...pageProps} />
    </>

  )
}

export default MyApp
