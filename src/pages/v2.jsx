import React, { useEffect, useRef } from 'react'
import Header from '../components/dom/header'
import Image from 'next/image'
import { unbounded, rotonto } from '@/styles/fonts'
import Card from '@/components/dom/class-card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Hero from '@/components/dom/hero'
import { Center, Environment, PerspectiveCamera, Preload, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Shape01, Shape02, Shape03, Shape05 } from '@/components/canvas/shapes'
import { forwardRef } from 'react'
import { SimplerContainer, StagedContainer } from '@/components/canvas/container/container'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const gsapRef = useRef()
  const s01 = useRef()
  const s02 = useRef()
  const s03 = useRef()
  const s05 = useRef()
  const containerRef = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-marquee',
        { xPercent: `-16.6666` },
        { xPercent: `-49.66666`, duration: 30, repeat: -1, ease: 'none' },
      )

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

      gsap.fromTo(
        '.s01-gsap',
        { scale: 5, x: -40, top: 60 },
        {
          scale: 1,
          x: 0,
          top: `auto`,
          duration: 0.25,
          scrollTrigger: {
            trigger: '#nav',
            start: 'top top',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, gsapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gsapRef}>
      {/* <Header /> */}
      <Hero />
      <Overlay ref={s01} />
      {/* ABOUT SECTION */}
      <section id='about' className='simple'>
        <div className='column'>
          <div className='sectionTitle'>
            <div className='sectionTitle-widget' ref={s02} />
            <h2 className={unbounded.className}>Emerging Tech Garages for Everyone</h2>
          </div>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its
            leading creators. It’s critical that Emerging Tech makers include everyone. These
            creators will shape the Internet and culture for decades to come.
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
            <div className='sectionTitle-widget' ref={s03} />
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
        <div style={{ width: 200, height: 100 }} ref={s05} />
        <h2 className={`${unbounded.className}`} style={{ textTransform: 'uppercase' }}>
          Gallery
        </h2>
        <p>
          The problems of today’s Internet are due in large part to lack of diversity among its
          leading creators. It’s critical that Emerging Tech makers include everyone. These creators
          will shape the Internet and culture for decades to come.
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
            leading creators. It’s critical that Emerging Tech makers include everyone. These
            creators will shape the Internet and culture for decades to come.
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
          <p>A Emerging Tech Garage for Everyone</p>
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
          <p aria-hidden>A Emerging Tech Garage for Everyone</p>
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
          <p aria-hidden>A Emerging Tech Garage for Everyone</p>
          <p aria-hidden>/</p>
        </div>
      </footer>
      <Canvas shadows eventSource={gsapRef} className='canvas'>
        <View track={s01}>
          <Common />
          <Center>
            <Shape01 />
          </Center>
        </View>
        <View track={s03}>
          <Common />
          <Shape02 />
        </View>
        <View track={s02}>
          <Common />
          <Shape03 />
        </View>
        <View track={s05}>
          <Common />
          <Shape05 />
        </View>
        <View track={containerRef}>
          <PerspectiveCamera makeDefault fov={10} position={[12, 2, -12]} />
          <pointLight position={[60, 0, 40]} intensity={0.1} />
          <SimplerContainer />
        </View>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default Home

export const getStaticProps = () => {
  return { props: { title: 'Whose Metaverse? | The Emerging Tech Garage For Everyone' } }
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
      />
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
