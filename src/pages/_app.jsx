import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/globals.scss'

import { Lexend } from '@next/font/google'
import { Syne } from '@next/font/google'

const lexend = Lexend({ subsets: ['latin'] })
const syne = Syne({ subsets: ['latin'] })

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref} className={`${lexend.className} ${syne.className}`}>
        <main>
          <Component {...pageProps} />
          {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
           * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
           * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
          {Component?.canvas && (
            <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
              {Component.canvas(pageProps)}
            </Scene>
          )}
        </main>
      </Layout>
    </>
  )
}
