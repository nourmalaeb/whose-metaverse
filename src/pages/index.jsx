import React, { useEffect, useRef } from 'react'
import Header from '../components/dom/header'
import Image from 'next/image'
import { unbounded, syne } from '@/styles/fonts'
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
      {/* ABOUT SECTION */}
      <section id='about' className='simple'>
        <div className='column'>
          <h2 className={`sectionTitle ${unbounded.className}`}>Web3 Garages for Everyone</h2>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its leading creators. It’s
            critical that Web3 makers include everyone. These creators will shape the Internet and culture for decades
            to come.
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
            The problems of today’s Internet are due in large part to lack of diversity among its leading creators. It’s
            critical that Web3 makers include everyone. These creators will shape the Internet and culture for decades
            to come.
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
          The problems of today’s Internet are due in large part to lack of diversity among its leading creators. It’s
          critical that Web3 makers include everyone. These creators will shape the Internet and culture for decades to
          come.
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
            The problems of today’s Internet are due in large part to lack of diversity among its leading creators. It’s
            critical that Web3 makers include everyone. These creators will shape the Internet and culture for decades
            to come.
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
