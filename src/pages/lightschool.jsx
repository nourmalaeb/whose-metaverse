import Head from 'next/head'

const Lightschool = () => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
    <Head>
      {/* <title>{page.title}</title> */}
      {/* <meta name='title' content={page.title} /> */}
    </Head>
    <iframe
      width='100%'
      height='100%'
      src='https://ynceoz.gmetri.com/whose_metaverse'
      id=''
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture;'
      allowFullscreen
      style={{ border: 0 }}
    ></iframe>
  </div>
)

export default Lightschool
