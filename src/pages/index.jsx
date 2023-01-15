import React, { useMemo, useEffect, useRef, forwardRef } from 'react'
import { lexend } from '@/styles/fonts'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Hero from '@/components/dom/hero'
import { Canvas } from '@react-three/fiber'
import { Geode01 } from '@/components/canvas/shapes'
import { useWindowSize } from 'react-use'
import { sanityClient } from '@/lib/sanity'
import {
  AboutSection,
  CommunitiesSection,
  CurriculumSection,
  Footer,
  GallerySection,
} from '@/components/dom/sections'
import { groq } from 'next-sanity'

gsap.registerPlugin(ScrollTrigger)

const scrollTriggerSettings = { trigger: '#about', scrub: 0.5, start: 'top 75%', end: 'top top' }

const Home = ({ data }) => {
  const page = data[0]
  // console.log(page)
  const gsapRef = useRef(null)

  const { width } = useWindowSize()

  useEffect(() => {
    let mql = window.matchMedia('(min-width: 600px)')

    const scaleFactor = mql.matches ? 120 : 180

    let ctx = gsap.context(() => {
      // FOOTER MARQUEE
      gsap.fromTo(
        '.footer-marquee',
        { xPercent: `0` },
        { xPercent: `-50`, duration: 30, repeat: -1, ease: 'none' },
      )

      // OVERLAY
      gsap.fromTo(
        '.pageTitle',
        {
          scale: 1 + width / scaleFactor,
          fontWeight: 1000,
          letterSpacing: -0.0225,
          lineHeight: 0.8,
          x: width / 24,
          y: 64,
        },
        {
          scale: 1,
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1,
          x: 5,
          y: 5,
          scrollTrigger: scrollTriggerSettings,
        },
      )

      gsap.fromTo(
        '.topleft-bracket',
        {
          scale: 1 + width / (scaleFactor * 6),
          borderWidth: 10,
        },
        {
          scale: 1,
          borderWidth: 2,
          scrollTrigger: scrollTriggerSettings,
        },
      )
      gsap.fromTo(
        '.bottomRight-bracket',
        {
          scale: 1 + width / (scaleFactor * 6),
          borderWidth: 10,
        },
        {
          scale: 1,
          borderWidth: 2,
          scrollTrigger: scrollTriggerSettings,
        },
      )

      // GALLERY

      gsap.utils.toArray('.galleryScroller').forEach((scroller) => {
        gsap.fromTo(
          scroller.querySelector('.galleryImg'),
          { opacity: 0.1, scale: 0.75 },
          {
            opacity: 2,
            scale: 1.25,
            ease: 'linear',
            scrollTrigger: {
              trigger: scroller,
              scrub: 0.5,
              start: 'top bottom',
              end: 'bottom top',
            },
          },
        )
      })

      // COURSES
      gsap.fromTo(
        '.courseCarousel',
        { yPercent: 0 },
        {
          yPercent: -50,
          duration: () => innerHeight / 10,
          repeat: -1,
          ease: 'none',
        },
      )
    }, gsapRef)

    return () => ctx.revert()
  }, [width, page])

  const heroMemo = useMemo(() => <Hero />, [])

  return (
    <div ref={gsapRef} className={lexend.className}>
      {heroMemo}
      <Overlay />
      <AboutSection title={page.aboutTitle} body={page.aboutBody} video={page.aboutVideoURL} />
      <CommunitiesSection
        title={page.communitiesTitle}
        body={page.communitiesBody}
        communities={page.communitiesFeatured}
      />
      <GallerySection title={page.galleryTitle} images={page.galleryImages} />
      <CurriculumSection
        title={page.curriculumTitle}
        body={page.curriculumBody}
        courses={page.curriculumCourses}
      />
      <Footer items={page.footerItems} />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const data = await sanityClient.fetch(
    groq`*[_type == 'home']{..., "aboutVideoURL": aboutVideo.asset->url}`,
  )
  return { props: { title: 'Whose Metaverse? | The Emerging Tech Garage For Everyone', data } }
}

const Overlay = forwardRef((props, fRef) => {
  const spacer = 20
  const col = 'var(--color-bg)'
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100dvh',
        zIndex: 20,
        mixBlendMode: 'difference',
        color: col,
      }}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          top: spacer + 5,
          left: spacer + 5,
          fontSize: '13px',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '0.1em',
          transformOrigin: 'top left',
        }}
        className={`pageTitle ${lexend.className}`}
      >
        WHOSE
        <br />
        METAVERSE?
      </div>
      <div
        className='topleft-bracket'
        style={{
          position: 'absolute',
          top: spacer,
          left: spacer,
          width: 64,
          height: 64,
          maxWidth: '12vw',
          maxHeight: '10vw',
          borderLeft: `1.5px solid ${col}`,
          borderTop: `1.5px solid ${col}`,
          transformOrigin: 'top left',
        }}
      />
      <div
        className='bottomRight-bracket'
        style={{
          position: 'absolute',
          bottom: spacer,
          right: spacer,
          width: 64,
          height: 64,
          maxWidth: '12vw',
          maxHeight: '10vw',
          borderRight: `1.5px solid ${col}`,
          borderBottom: `1.5px solid ${col}`,
          transformOrigin: 'bottom right',
        }}
      />
      <a
        ref={fRef}
        className='s01-gsap'
        style={{
          position: 'absolute',
          transformOrigin: 'top right',
          aspectRatio: 1,
          // border: '3px solid blue',
          width: 64,
          maxWidth: '12vw',
          bottom: spacer,
          left: spacer,
          zIndex: 200,
        }}
        href='#nav'
      >
        <Canvas>
          <Geode01 scale={0.5} />
        </Canvas>
      </a>
    </div>
  )
})

Overlay.displayName = 'Overlay'
