import React, { useMemo, useEffect, useRef, useState, useLayoutEffect, forwardRef } from 'react'
import { unbounded, lexend } from '@/styles/fonts'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Hero from '@/components/dom/hero'
import { Center } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Geode01 } from '@/components/canvas/shapes'
import { useMouse, useWindowSize } from 'react-use'
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
  console.log(page)
  const gsapRef = useRef(null)
  const [mouseHover, setMouseHover] = useState(false)

  const { width, height } = useWindowSize()

  // crazy mouse stuff
  useEffect(() => {
    const links = document.querySelectorAll('a, button')
    const mouseParty = () => {
      setMouseHover(true)
    }

    const mouseUnparty = () => {
      setMouseHover(false)
    }

    links.forEach((a) => {
      a.addEventListener('mouseenter', () => mouseParty())
      a.addEventListener('mouseleave', () => mouseUnparty())
    })

    return links.forEach((a) => {
      a.removeEventListener('mouseenter', () => mouseParty())
      a.removeEventListener('mouseleave', () => mouseUnparty())
    })
  }, [])

  useLayoutEffect(() => {
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
        const gImg = scroller.querySelector('.galleryImg')
        gsap.fromTo(
          gImg,
          { opacity: 0, scale: 0.75 },
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
  }, [width])

  const heroMemo = useMemo(() => <Hero />, [])

  return (
    <div ref={gsapRef} className={lexend.className}>
      <MouseTracker hovered={mouseHover} space={gsapRef} />
      {/* <Header /> */}
      {heroMemo}
      <Overlay />
      {/* ABOUT SECTION */}
      <AboutSection title={page.aboutTitle} body={page.aboutBody} video={page.aboutVideoURL} />
      {/* COMMUNITIES SECTION */}
      <CommunitiesSection
        title={page.communitiesTitle}
        body={page.communitiesBody}
        communities={page.communitiesFeatured}
      />
      {/* GALLERY SECTION */}
      <GallerySection title={page.galleryTitle} images={page.galleryImages} />
      {/* CURRICULUM SECTION */}
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

const MouseTracker = forwardRef(({ x, y, hovered, space }, fRef) => {
  const { docX, docY } = useMouse(space)
  return (
    <div
      ref={fRef}
      style={{
        width: 25,
        height: 25,
        position: 'absolute',
        left: `${docX - 2}px`,
        top: `${docY - 2}px`,
        zIndex: 999999,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
      }}
    >
      <div
        className='mouseparty'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '70%',
          height: '70%',
          borderLeft: `2px solid ${hovered ? 'white' : 'gold'}`,
          borderTop: `2px solid ${hovered ? 'white' : 'gold'}`,
          borderWidth: hovered ? '4px' : '2px',
          transformOrigin: 'top left',
          transform: `scale(${hovered ? '1.5' : '1'})`,
          transition: 'all 0.1s ease-out',
        }}
      />
      <div
        className='mouseparty'
        style={{
          position: 'absolute',
          bottom: hovered ? 3 : 0,
          right: hovered ? 3 : 0,
          width: 10,
          height: 10,
          border: `2px solid ${hovered ? 'white' : 'gold'}`,
          borderWidth: hovered ? '3px' : '2px',
          // transformOrigin: 'bottom right',
          transform: `rotate(${hovered ? '90deg' : '0deg'})`,
          // borderRadius: hovered ? 99 : 0,
          // background: hovered ? 'white' : 'transparent',
          transition: 'all 0.1s ease-out',
        }}
      />
      <div
        className='mouseparty'
        style={{
          position: 'absolute',
          bottom: hovered ? -5 : 0,
          right: hovered ? -5 : 0,
          width: 10,
          height: 10,
          border: `2px solid ${hovered ? 'white' : 'gold'}`,
          borderWidth: hovered ? '3px' : '2px',
          // transformOrigin: 'bottom right',
          transform: `rotate(${hovered ? '90deg' : '0deg'})`,
          // borderRadius: hovered ? 99 : 0,
          // background: hovered ? 'white' : 'transparent',
          transition: 'all 0.1s ease-out',
        }}
      />
      <div
        className='mouseparty'
        style={{
          position: 'absolute',
          bottom: hovered ? -13 : 0,
          right: hovered ? -13 : 0,
          width: 10,
          height: 10,
          border: `2px solid ${hovered ? 'white' : 'gold'}`,
          // borderWidth: hovered ? '3px' : '2px',
          // transformOrigin: 'bottom right',
          // transform: `rotate(${hovered ? '90deg' : '0deg'})`,
          borderRadius: hovered ? 99 : 0,
          background: hovered ? 'white' : 'transparent',
          transition: 'all 0.1s ease-out',
        }}
      />
    </div>
  )
})

MouseTracker.displayName = 'MouseTracker'

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

const CubeScene = () => {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.5))
  return (
    <Center scale={3}>
      <mesh ref={ref}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </Center>
  )
}
