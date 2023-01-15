import { Shape05 } from '@/components/canvas/shapes'
import { urlFor } from '@/lib/sanity'
import { useEffect, useRef } from 'react'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'
import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

export const GallerySection = ({ title, body, images, skew }) => {
  const increment = 1 / images.length
  return (
    <section id='gallery' className='gallery'>
      {/* <div className='galleryInner'> */}
      <div style={{ width: 200, height: 100 }}>
        <Canvas>
          <Center scale={2}>
            <Shape05 />
          </Center>
        </Canvas>
      </div>
      <h2
        className={`${unbounded.className}`}
        style={{ textTransform: 'uppercase', marginBottom: 50 }}
      >
        {title}
      </h2>
      {body && <PortableText value={body} />}
      <div
        className='galleryAnimTarget'
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '10vw',
        }}
      >
        {images.map((img, idx) => {
          return (
            <div
              key={`img-${idx}`}
              className={`galleryScroller${idx}`}
              style={{ padding: '5vh', position: 'relative', margin: '0 auto' }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '80vw',
                  aspectRatio: getImageDimensions(img).aspectRatio,
                }}
                className={`galleryImg${idx}`}
              >
                <Image
                  src={urlFor(img).width(1600).url()}
                  alt=''
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )
        })}
        {/* </div> */}
      </div>
    </section>
  )
}
