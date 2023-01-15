import { buildFileUrl, parseAssetId } from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
// import ReactPlayer from 'react-player'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('../components/dom/videoPlayer'), { ssr: false })

export const sanityClient = createClient({
  projectId: 'owrqzb2p',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: typeof document !== 'undefined',
})

const imageBuilder = imageUrlBuilder(sanityClient)

const getVideoURL = (value) => {
  const id = parseAssetId(value.asset._ref)
  return buildFileUrl({ ...id, projectId: 'owrqzb2p', dataset: 'production' })
}

export const urlFor = (source) => imageBuilder.image(source)

const VideoBlock = ({ value }) => {
  return <VideoPlayer url={getVideoURL(value)} />
}

export const portableTextComponents = {
  types: {
    video: VideoBlock,
  },
}
