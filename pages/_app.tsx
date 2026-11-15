import type { AppProps } from 'next/app';
import Analytics from '@/components/Analytics';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} /><Analytics /></>;
}
