import Header from '@/config'
import '@/styles/globals.scss'
import '@/styles/slick.css'

import { lexend } from '@/styles/fonts'

export default function App({ Component, pageProps = { title: 'index' } }) {
  return (
    <>
      <Header title={pageProps.title} />
      <main className={lexend.className} style={{ background: 'var(--color-bg)' }}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
