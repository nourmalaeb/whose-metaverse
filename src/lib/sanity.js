import {
  buildFileUrl,
  getAssetUrlType,
  getFile,
  getFileAsset,
  getIdFromString,
  parseAssetId,
} from '@sanity/asset-utils'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
import ReactPlayer from 'react-player'

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
  return (
    <div className='video inlineVideo'>
      <ReactPlayer
        url={getVideoURL(value)}
        controls
        width='100%'
        height='100%'
        style={{ zIndex: 999, position: 'relative' }}
        playing
        playsinline
        muted
      />
    </div>
  )
}

export const portableTextComponents = {
  types: {
    video: VideoBlock,
  },
}
