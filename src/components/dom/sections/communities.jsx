import { Shape01 } from '@/components/canvas/shapes'
import { urlFor } from '@/lib/sanity'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Canvas } from '@react-three/fiber'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

export const CommunitiesSection = ({ title, body, communities }) => {
  return (
    <section id='communities'>
      <div className='content'>
        <div className='intro'>
          <div>
            <div className='sectionTitle-widget'>
              <Canvas>
                <Shape01 scale={3} />
              </Canvas>
            </div>
            <h2 className={unbounded.className}>{title}</h2>
          </div>
          <PortableText value={body} />
        </div>
        {communities.length > 0 && <h2 className={unbounded.className}>Featured Communities</h2>}
        {communities.map(({ communityName, communityDescription, communityImage }, idx) => (
          <div key={idx} className={`community${idx % 2 === 0 ? ` right` : ''}`}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: getImageDimensions(communityImage).aspectRatio,
              }}
            >
              <Image src={urlFor(communityImage).width(1000).url()} fill />
            </div>
            <h3>{communityName}</h3>
            <PortableText value={communityDescription} />
          </div>
        ))}
      </div>
    </section>
  )
}
