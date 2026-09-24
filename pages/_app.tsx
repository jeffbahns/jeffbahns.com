import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-dm-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
