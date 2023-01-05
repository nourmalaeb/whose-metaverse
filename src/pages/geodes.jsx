import React, { useEffect, useRef } from 'react'
import Header from '../components/dom/header'
import Image from 'next/image'
import { unbounded, syne, rotonto } from '@/styles/fonts'
import Card from '@/components/dom/class-card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Hero from '@/components/dom/hero'
import { Center, Environment, PerspectiveCamera, Preload, View } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Geode01, Shape01, Shape02, Shape03, Shape05 } from '@/components/canvas/shapes'
import { forwardRef } from 'react'
import { StagedContainer } from '@/components/canvas/container/container'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const gsapRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    let mql = window.matchMedia('(min-width: 600px)')
    console.log(mql)
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-marquee',
        { xPercent: `-16.6666` },
        { xPercent: `-49.66666`, duration: 30, repeat: -1, ease: 'none' },
      )

      mql.matches &&
        gsap.fromTo(
          '.pageTitle',
          { scale: 10, fontWeight: 900, letterSpacing: -0.0125, lineHeight: 0.9, x: 64, y: 64 },
          {
            scale: 1,
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: 1,
            x: 0,
            y: 0,
            scrollTrigger: { trigger: '#about', scrub: 0.5, start: 'top bottom', end: 'top top' },
          },
        )
    }, gsapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gsapRef}>
      {/* <Header /> */}
      <Hero />
      <Overlay />
      {/* ABOUT SECTION */}
      <section id='about' className='simple'>
        <div className='column'>
          <div className='sectionTitle'>
            <div className='sectionTitle-widget'>
              <Canvas>
                <Center scale={3}>
                  <Shape02 />
                </Center>
              </Canvas>
            </div>
            <h2 className={unbounded.className}>Web3 Garages for Everyone</h2>
          </div>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its
            leading creators. It’s critical that Web3 makers include everyone. These creators will
            shape the Internet and culture for decades to come.
          </p>
        </div>
        {/* <div className='framed' style={{ aspectRatio: 2, height: 300 }}>
          <Image src='/img/barry.jpg' alt='' fill style={{ objectFit: 'cover' }} />
        </div> */}
        <div style={{ aspectRatio: 1.25, width: 600, maxWidth: '100%' }} ref={containerRef} />
      </section>
      {/* COMMUNITIES SECTION */}
      <section id='communities' className='simple'>
        <div className='column'>
          <div className='sectionTitle'>
            <div className='sectionTitle-widget'>
              <Canvas>
                <CubeScene />
              </Canvas>
            </div>
            <h2 className={unbounded.className}>Our Communities</h2>
          </div>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its
            leading creators. It’s critical that Web3 makers include everyone. These creators will
            shape the Internet and culture for decades to come.
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
        <h2 className={`${unbounded.className}`} style={{ textTransform: 'uppercase' }}>
          Gallery
        </h2>
        <p>
          The problems of today’s Internet are due in large part to lack of diversity among its
          leading creators. It’s critical that Web3 makers include everyone. These creators will
          shape the Internet and culture for decades to come.
        </p>
        <div className='framed' style={{ aspectRatio: 2, height: 300 }}>
          <Image src='/img/barry.jpg' alt='' fill style={{ objectFit: 'cover' }} />
        </div>
      </section>
      {/* CURRICULUM SECTION */}
      <section id='curriculum' className='simple'>
        <div className='column'>
          <h2 className={`sectionTitle ${unbounded.className}`}>Curriculum</h2>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its
            leading creators. It’s critical that Web3 makers include everyone. These creators will
            shape the Internet and culture for decades to come.
          </p>
        </div>
        <div>
          <Card
            title='Introduction to the Metaverse'
            content='Intro class getting acquainted with terms, technology, and real-world applications of Virtual Reality.'
            pic='/img/barry.jpg'
          />
          <Card
            title='Introduction to the Metaverse'
            content='Intro class getting acquainted with terms, technology, and real-world applications of Virtual Reality.'
            pic='/img/barry.jpg'
          />
        </div>
      </section>
      <footer className={syne.className}>
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
          <p>A Web3 Garage for Everyone</p>
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
          <p aria-hidden>A Web3 Garage for Everyone</p>
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
          <p aria-hidden>A Web3 Garage for Everyone</p>
          <p aria-hidden>/</p>
        </div>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps = () => {
  return { props: { title: 'Whose Metaverse? | The Web3 Garage For Everyone' } }
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
        className={`pageTitle ${unbounded.className}`}
      >
        WHOSE
        <br />
        METAVERSE?
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: spacer,
          left: spacer,
          width: 120,
          height: 100,
          maxWidth: '12vw',
          maxHeight: '10vw',
          borderLeft: `1.5px solid ${col}`,
          borderBottom: `1.5px solid ${col}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: spacer,
          right: spacer,
          width: 120,
          height: 100,
          maxWidth: '12vw',
          maxHeight: '10vw',
          borderRight: `1.5px solid ${col}`,
          borderTop: `1.5px solid ${col}`,
        }}
      />
      <div
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
          right: spacer,
          zIndex: 200,
        }}
      >
        <Canvas>
          <Geode01 scale={0.5} />
        </Canvas>
      </div>
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
    <PerspectiveCamera makeDefault fov={20} position={[0, 0, 6]} />
  </>
)

const CubeScene = () => {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.5))
  return (
    <Center scale={3}>
      <mesh ref={ref}>
        <boxBufferGeometry />
        <meshNormalMaterial />
      </mesh>
    </Center>
  )
}
