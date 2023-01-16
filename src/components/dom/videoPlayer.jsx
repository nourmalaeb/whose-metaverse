import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const VideoPlayer = ({ url }) => (
  <div className='video inlineVideo'>
    <ReactPlayer
      url={url}
      controls
      width='100%'
      height='100%'
      style={{ zIndex: 999, position: 'relative' }}
      playing
      playsinline
      muted
      loop
    />
  </div>
)

export default VideoPlayer
