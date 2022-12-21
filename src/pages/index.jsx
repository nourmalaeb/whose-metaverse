import React from 'react'
import Header from '../components/dom/header'

import { Unbounded } from '@next/font/google'
import Image from 'next/image'

const unbounded = Unbounded()

const Home = () => {
  return (
    <>
      <Header />
      {/* ABOUT SECTION */}
      <section id='about'>
        <div className='column'>
          <h2 className={`sectionTitle ${unbounded.className}`}>Web3 Garages for Everyone</h2>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its leading creators. It’s
            critical that Web3 makers include everyone. These creators will shape the Internet and culture for decades
            to come.
          </p>
        </div>
        <div className='framed' style={{ aspectRatio: 2, height: 300 }}>
          <Image src='/img/barry.jpg' alt='' fill />
        </div>
      </section>
      {/* CURRICULUM SECTION */}
      <section id='curriculum'>
        <div className='column'>
          <h2 className={`sectionTitle ${unbounded.className}`}>Our Communities</h2>
          <p>
            The problems of today’s Internet are due in large part to lack of diversity among its leading creators. It’s
            critical that Web3 makers include everyone. These creators will shape the Internet and culture for decades
            to come.
          </p>
        </div>
        <div className='framed' style={{ aspectRatio: 2, height: 300 }}>
          <Image src='/img/barry.jpg' alt='' fill />
        </div>
      </section>
    </>
  )
}

export default Home
