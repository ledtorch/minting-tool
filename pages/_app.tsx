import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TonConnectUIProvider manifestUrl="https://viutila.github.io/tonconnect-manifest.json">
      <Component {...pageProps} />
    </TonConnectUIProvider>
  )
}
