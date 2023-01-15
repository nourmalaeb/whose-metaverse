import { Shape02 } from '@/components/canvas/shapes'
import { portableTextComponents } from '@/lib/sanity'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('../videoPlayer'), { ssr: false })

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
      <VideoPlayer url={video} />
    </section>
  )
}
