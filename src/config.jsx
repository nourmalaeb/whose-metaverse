import Head from 'next/head'

const titleDefault = 'Whose Metaverse?'
const url = 'https://whosemetaverse.org/'
const description = 'Emerging Tech Garages for Everyone'

export default function Header({ title = titleDefault }) {
  return (
    <Head>
      {/* Recommended Meta Tags */}
      <meta charSet='utf-8' />
      <meta name='language' content='english' />
      <meta httpEquiv='content-type' content='text/html' />

      {/* Search Engine Optimization Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index,follow' />
      <meta name='distribution' content='web' />
      {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
      <meta name='og:title' content={title} />
      <meta name='og:type' content='site' />
      <meta name='og:url' content={url} />
      <meta name='og:image' content={'/icons/share.png'} />
      <meta name='og:site_name' content={title} />
      <meta name='og:description' content={description} />

      {/* Meta Tags for HTML pages on Mobile */}
      {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
      <meta name='viewport' content='width=device-width, minimum-scale=1, initial-scale=1.0' />
      <meta name='theme-color' content='#000' />
      <link rel='shortcut icon' href='/icons/wm-favicon.png' />

      {/* Draco loaders optimization */}
      <link
        rel='prefetch'
        crossOrigin='anonymous'
        href='https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_wasm_wrapper.js'
      />
      <link
        rel='prefetch'
        crossOrigin='anonymous'
        href='https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_decoder.wasm'
      />
    </Head>
  )
}
