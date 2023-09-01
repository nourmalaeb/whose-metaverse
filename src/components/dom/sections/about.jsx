import { Shape02 } from '@/components/canvas/shapes'
import { portableTextComponents } from '@/lib/sanity'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import VideoPlayer from '../videoPlayer'

export const AboutSection = ({ title, body, video }) => {
  return (
    <section id='about'>
      <div className='sectionTitle-widget'>
        <Canvas>
          <Center scale={3}>
            <Shape02 />
          </Center>
        </Canvas>
      </div>
      <h2 className={unbounded.className}>{title}</h2>
      <div className='aboutContent'>
        <PortableText value={body} components={portableTextComponents} />
      </div>
      {/* <VideoPlayer
        url={[
          {
            src: `https://d1eqjf0s95vgsu.cloudfront.net/Whose_Metaverse__Student_Video.mp4`,
            type: 'video/mp4',
          },
          {
            src: `https://d1eqjf0s95vgsu.cloudfront.net/Whose_Metaverse__Student_Video.webm`,
            type: 'video/webm',
          },
        ]}
      /> */}
      <div className='video inlineVideo'>
        <video playsInline muted autoPlay loop controls preload='auto'>
          <source
            src='https://d1eqjf0s95vgsu.cloudfront.net/Whose_Metaverse__Student_Video.webm'
            type='video/webm'
          />
          <source
            src='https://d1eqjf0s95vgsu.cloudfront.net/Whose_Metaverse__Student_Video.mp4'
            type='video/mp4'
          />
          <p>
            Your browser doesn't support HTML video. Here is a
            <a href='https://d1eqjf0s95vgsu.cloudfront.net/Whose_Metaverse__Student_Video.mp4'>
              link to the video
            </a>{' '}
            instead.
          </p>
        </video>
      </div>
    </section>
  )
}
