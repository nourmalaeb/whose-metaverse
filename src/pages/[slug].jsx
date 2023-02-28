import React from 'react'
import { sanityClient } from '@/lib/sanity'
import { groq } from 'next-sanity'
import Head from 'next/head'

const embedPagesQuery = groq`*[_type == "embedPage"] { slug }`

const singleEmbedPageQuery = (slug) => groq`*[_type == "embedPage" && slug.current == "${slug}"][0]`

const Person = ({ page }) => {
  // console.log('PAGE', page)
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
      <Head>
        <title>Whose Metaverse | {page.title}</title>
        <meta name='title' content={page.title} />
      </Head>
      <iframe
        width='100%'
        height='100%'
        src={page.iframeSrc}
        id=''
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture;'
        allowFullscreen
        style={{ border: 0 }}
      ></iframe>
    </div>
  )
}

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const pages = await sanityClient.fetch(embedPagesQuery)
  const paths = pages.map((page) => ({
    params: { slug: page.slug.current },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const page = await sanityClient.fetch(singleEmbedPageQuery(params.slug))
  return { props: { page } }
}

export default Person
