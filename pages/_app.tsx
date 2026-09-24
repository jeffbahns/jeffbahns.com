import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-jetbrains: ${mono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
