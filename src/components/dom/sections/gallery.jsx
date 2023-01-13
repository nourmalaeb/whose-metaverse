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

export const GallerySection = ({ title, body, images }) => {
  const increment = 1 / images.length
  const galleryRef = useRef()

  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       '.galleryAnimTarget',
  //       { rotateY: `0` },
  //       {
  //         rotateY: `360deg`,
  //         // duration: 10,
  //         // repeat: -1,
  //         // ease: 'none',
  //         scrollTrigger: {
  //           trigger: '#gallery',
  //           scrub: 0.5,
  //           start: 'top bottom',
  //           end: 'bottom top',
  //         },
  //       },
  //     )
  //   }, galleryRef)
  //   return () => ctx.revert()
  // }, [])
  return (
    <section id='gallery' className='gallery' ref={galleryRef}>
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
          transformStyle: 'preserve-3d',
          width: '80vw',
          height: '100vh',
        }}
      >
        {images.map((img, idx) => (
          <div
            key={`img-${idx}`}
            style={{
              position: 'absolute',
              width: '50vw',
              transform: `rotateY(${360 * increment * idx}deg) translateZ(800px)`,
              aspectRatio: getImageDimensions(img).aspectRatio,
            }}
          >
            <Image src={urlFor(img).width(800).url()} alt='' fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
        {/* </div> */}
      </div>
    </section>
  )
}
