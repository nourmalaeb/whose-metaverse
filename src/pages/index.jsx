import React, { useMemo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { unbounded, lexend } from '@/styles/fonts'
import Card from '@/components/dom/class-card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Hero from '@/components/dom/hero'
import { Center, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Forefront, Geode01, Shape01, Shape02, Shape03, Shape05 } from '@/components/canvas/shapes'
import { forwardRef } from 'react'
import { useMouse, useWindowSize } from 'react-use'
import dynamic from 'next/dynamic'
import Slider from 'react-slick'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

const scrollTriggerSettings = { trigger: '#about', scrub: 0.5, start: 'top 75%', end: 'top top' }

const Home = () => {
  const gsapRef = useRef(null)
  const mouseRef = useRef()
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

    return links.forEach((target) => {
      target.removeEventListener('mouseenter', () => mouseParty())
      target.removeEventListener('mouseleave', () => mouseUnparty())
    })
  }, [])

  useEffect(() => {
    let mql = window.matchMedia('(min-width: 600px)')

    const scaleFactor = mql.matches ? 120 : 180

    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-marquee',
        { xPercent: `-16.6666` },
        { xPercent: `-49.66666`, duration: 30, repeat: -1, ease: 'none' },
      )

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
    }, gsapRef)
    return () => ctx.revert()
  }, [width])

  const mouse = useMouse(gsapRef)

  const heroMemo = useMemo(() => <Hero />, [])

  return (
    <div ref={gsapRef} className={lexend.className}>
      <MouseTracker x={mouse.docX} y={mouse.docY} ref={mouseRef} hovered={mouseHover} />
      {/* <Header /> */}
      {heroMemo}
      <Overlay />
      {/* ABOUT SECTION */}
      <AboutSection />
      {/* COMMUNITIES SECTION */}
      <section id='communities' className='simple'>
        <div className='column'>
          <div className='sectionTitle'>
            <div className='sectionTitle-widget'>
              <Canvas>
                <Shape01 scale={3} />
              </Canvas>
            </div>
            <h2 className={unbounded.className}>Our Communities</h2>
          </div>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its
            leading creators. It’s critical that Emerging Tech makers include everyone. These
            creators will shape the Internet and culture for decades to come.
          </p>
        </div>
        <div className='framed' style={{ aspectRatio: 2, height: 300 }}>
          <Image src='/img/barry.jpg' alt='' fill style={{ objectFit: 'cover' }} />
        </div>
      </section>
      {/* GALLERY SECTION */}
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
          Gallery
        </h2>
        <div
          style={{ position: 'relative', aspectRatio: 2, width: '50vw', left: '-12vw', margin: 20 }}
        >
          <Image src='/img/w3gfe.jpg' alt='' fill style={{ objectFit: 'cover' }} />
        </div>
        <div
          style={{
            position: 'relative',
            aspectRatio: 14 / 11,
            width: '50vw',
            left: '12vw',
            margin: 20,
          }}
        >
          <Image src='/img/lobby2.jpg' alt='' fill style={{ objectFit: 'cover' }} />
        </div>
      </section>
      {/* CURRICULUM SECTION */}
      <section id='curriculum' className='simple vert'>
        <div className='column'>
          <div style={{ width: 100, height: 100 }}>
            <Canvas camera={{ position: [20, 0, 20], fov: 20 }}>
              <Center scale={3}>
                <Common />
                <Forefront />
              </Center>
            </Canvas>
          </div>
          <h2 className={`sectionTitle ${unbounded.className}`}>Curriculum</h2>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its
            leading creators. It’s critical that Emerging Tech makers include everyone. These
            creators will shape the Internet and culture for decades to come.
          </p>
        </div>
        <Courses />
      </section>
      <footer className={unbounded.className}>
        <div className='footer-marquee'>
          <p>
            A{' '}
            <a href='https://lightshed.io/' target='_blank' rel='noreferrer noopener'>
              Lightshed
            </a>{' '}
            Project
          </p>
          <p aria-hidden>/</p>
          <p>A Shared Studios Project</p>
          <p aria-hidden>/</p>
          <p>A labor of love</p>
          <p aria-hidden>/</p>
          <p>An Emerging Tech Garage for Everyone</p>
          <p aria-hidden>/</p>
          <p aria-hidden>
            A{' '}
            <a href='https://lightshed.io/' target='_blank' rel='noreferrer noopener'>
              Lightshed
            </a>{' '}
            Project
          </p>
          <p aria-hidden>/</p>
          <p aria-hidden>A Shared Studios Project</p>
          <p aria-hidden>/</p>
          <p aria-hidden>A labor of love</p>
          <p aria-hidden>/</p>
          <p aria-hidden>An Emerging Tech Garage for Everyone</p>
          <p aria-hidden>/</p>
          <p aria-hidden>
            A{' '}
            <a href='https://lightshed.io/' target='_blank' rel='noreferrer noopener'>
              Lightshed
            </a>{' '}
            Project
          </p>
          <p aria-hidden>/</p>
          <p aria-hidden>A Shared Studios Project</p>
          <p aria-hidden>/</p>
          <p aria-hidden>A labor of love</p>
          <p aria-hidden>/</p>
          <p aria-hidden>An Emerging Tech Garage for Everyone</p>
          <p aria-hidden>/</p>
        </div>
      </footer>
    </div>
  )
}

export default Home

const Courses = () => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 2,
    speed: 500,
  }

  return (
    <div className='courses'>
      <Slider {...settings}>
        <Card
          title='Introduction to the Metaverse'
          content='Intro class getting acquainted with terms, technology, and real-world applications of Virtual Reality.'
          pic='/img/barry.jpg'
        />
        <Card
          title='What Makes a Game a Game?'
          content='Game vs. Play; Parts of a Game; Core Mechanics, Components, and their Affordances.'
          pic='/img/lobby2.jpg'
        />
        <Card
          title='What Makes a Game a Game?'
          content='Game vs. Play; Parts of a Game; Core Mechanics, Components, and their Affordances.'
          pic='/img/lobby2.jpg'
        />
      </Slider>
    </div>
  )
}

export const getStaticProps = () => {
  return { props: { title: 'Whose Metaverse? | The Emerging Tech Garage For Everyone' } }
}

const AboutSection = () => {
  return (
    <section id='about'>
      <div className='sectionTitle-widget'>
        <Canvas>
          <Center scale={3}>
            <Shape02 />
          </Center>
        </Canvas>
      </div>
      <h2 className={unbounded.className}>Emerging Tech Garages for Everyone</h2>
      <p>
        The problems of today’s Internet are due in large part to lack of diversity among its
        leading creators. It’s critical that Emerging Tech makers include everyone. These creators
        will shape the Internet and culture for decades to come.
      </p>
      <div style={{ position: 'relative', aspectRatio: 16 / 9, width: '80vw' }}>
        <ReactPlayer
          url={'/media/Whose_Metaverse_Video.mp4'}
          controls
          width='100%'
          height='100%'
          style={{ zIndex: 999, position: 'relative' }}
        />
      </div>
    </section>
  )
}

const MouseTracker = forwardRef(({ x, y, hovered }, fRef) => {
  return (
    <div
      ref={fRef}
      style={{
        width: 25,
        height: 25,
        position: 'absolute',
        left: `${x - 2}px`,
        top: `${y - 2}px`,
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

const Common = ({ color }) => (
  <>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[2, 3, 1]} intensity={1} />
    <pointLight position={[-1, -1, -1]} color='magenta' />
    <Environment preset='dawn' />
  </>
)

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
