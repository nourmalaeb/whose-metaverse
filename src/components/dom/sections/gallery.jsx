import { Shape05 } from '@/components/canvas/shapes'
import { urlFor } from '@/lib/sanity'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'

export const GallerySection = ({ title, body, images }) => {
  return (
    <section id='gallery' className='gallery'>
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
            <GalleryScroller
              url={urlFor(img).url()}
              aspect={getImageDimensions(img).aspectRatio}
              key={img._key}
              idx={idx}
            />
          )
        })}
      </div>
    </section>
  )
}

const GalleryScroller = ({ url, aspect, idx }) => {
  return (
    <div
      className={`galleryScroller`}
      style={{ padding: '0', position: 'relative', margin: '0 auto' }}
    >
      <div
        style={{
          position: 'relative',
          width: '80vw',
          maxHeight: '100vw',
          aspectRatio: aspect,
          borderRadius: '2vmax',
          overflow: 'hidden',
        }}
        className={`galleryImg`}
      >
        <Image src={url} alt='' fill style={{ objectFit: 'contain' }} priority={idx <= 2} />
      </div>
    </div>
  )
}
