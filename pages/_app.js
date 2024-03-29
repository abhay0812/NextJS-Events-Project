import '@/styles/globals.css';

import Head from 'next/head';

import { NotificationContextProvider } from '../store/NotificationContext';

import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  )
}
