import React, { useEffect, useRef } from 'react'
import Header from '../components/dom/header'
import Image from 'next/image'
import { unbounded, rotonto } from '@/styles/fonts'
import Card from '@/components/dom/class-card'
import gsap from 'gsap'

const Home = () => {
  const gsapRef = useRef()
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-marquee',
        { xPercent: `-16.6666` },
        { xPercent: `-49.66666`, duration: 30, repeat: -1, ease: 'none' },
      )
    }, gsapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gsapRef}>
      <Header />
      <Overlay />
      {/* ABOUT SECTION */}
      <section id='about' className='simple'>
        <div className='column'>
          <h2 className={`sectionTitle ${unbounded.className}`}>
            Emerging Tech Garages for Everyone
          </h2>
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
      {/* COMMUNITIES SECTION */}
      <section id='communities' className='simple'>
        <div className='column'>
          <h2 className={`sectionTitle ${unbounded.className}`}>Our Communities</h2>
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

export const getStaticProps = () => {
  return { props: { title: 'Whose Metaverse? | The Emerging Tech Garage For Everyone' } }
}

function Overlay() {
  const spacer = 20
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
      }}
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
        }}
        className={rotonto.className}
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
          borderLeft: `1.5px solid black`,
          borderBottom: `1.5px solid black`,
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
          borderRight: `1.5px solid black`,
          borderTop: `1.5px solid black`,
        }}
      />
    </div>
  )
}
