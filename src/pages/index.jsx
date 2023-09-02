import React, { useMemo, useRef, forwardRef, useEffect, Suspense } from 'react'
import { lexend, unbounded } from '@/styles/fonts'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import Hero from '@/components/dom/hero'
import { useWindowSize } from 'react-use'
import { sanityClient, urlFor } from '@/lib/sanity'
import {
  AboutSection,
  CommunitiesSection,
  CurriculumSection,
  Footer,
  FourQuestions,
  GallerySection,
  People,
  SignUpSection,
} from '@/components/dom/sections'
import { groq } from 'next-sanity'
import { useGsapContext } from '@/lib/anims'
import Head from 'next/head'
import { Button } from '@/components/dom/ui'
import dynamic from 'next/dynamic'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const scrollTriggerSettings = { trigger: '#heroLoading', scrub: 0.5, start: 'top -50%', end: 'top -125%' }

const Home = ({ data }) => {
  const page = data[0]
  // console.log(page)
  const gsapRef = useRef(null)
  const ctx = useGsapContext(gsapRef)

  const { width } = useWindowSize()

  useEffect(() => {
    let mql = window.matchMedia('(min-width: 600px)')

    const scaleFactor = 135

    ctx.add((self) => {
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
          x: mql.matches ? width / 24 : -10,
          y: mql.matches ? 64 : 72,
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

      // QUESTIONS
      const questionsSection = self.selector('.questionsQuestions')[0]
      const questions = self.selector('.questionContainer')
      questions.forEach((q, idx) => {
        const qh2 = q.querySelector('.question')
        let heights = 0

        for (let i = 0; i < idx; i++) {
          heights += questions[i].querySelector('.question').offsetHeight
        }

        ScrollTrigger.create({
          trigger: questionsSection,
          scrub: true,
          start: `top ${idx * -q.offsetHeight + heights}`,
          end: `bottom ${-q.offsetHeight}`,
          pin: qh2,
        })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: q,
              scrub: true,
              start: `top 80%`,
              end: `top 30%`,
            },
          })
          .from(qh2, { opacity: 0 })
          .to(qh2, { opacity: 1 })
      })

      gsap.to('.questionsContentWrapper', {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        scrollTrigger: {
          trigger: '.questionsContentWrapper',
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
      gsap.to('.questionsFader', {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        scrollTrigger: {
          trigger: '.questionsContentWrapper',
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        },
      })

      // GALLERY
      const imgs = self.selector('.galleryScroller')
      imgs.forEach((scroller, index) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scroller,
              scrub: 0.15,
              start: 'top 65%',
              end: 'bottom 25%',
            },
          })
          .from(scroller.querySelector('.galleryImg'), {
            opacity: 0,
            scale: 0.5,
          })
          .to(scroller.querySelector('.galleryImg'), {
            opacity: 1,
            scale: 1,
            ease: 'linear',
          })
          .to(scroller.querySelector('.galleryImg'), {
            opacity: 1,
            scale: 1,
            ease: 'linear',
          })
          .to(scroller.querySelector('.galleryImg'), {
            opacity: 1,
            scale: 1,
            ease: 'linear',
          })
          .to(scroller.querySelector('.galleryImg'), {
            opacity: 0,
            scale: 1.5,
            ease: 'linear',
          })

        // gsap.to(scroller.querySelector('.galleryImg'), {
        //   motionPath: {
        //     path:
        //       index % 2 === 0
        //         ? `M-12.0874 19.4813C-20.98329 14.728 -13.99695 -25.29181 5.1581 -19.85131C15.3918 -14.11096 33.154 10.2124 18.3269 3.241C-1.793 -6.5267 5.1581 -4.2346 -12.0874 19.4813Z`
        //         : `M25.293 -10.1657C29.2725 -4.7063 15.6696 -3.0997 4.0642 1.2432C-7.2372 5.1087 -16.58479 13.2143 -19.81617 6.305C-21.60456 -3.7684 -14.56521 -28.39443 -10.846 -16.517C-4.197 0.6563 17.601 -22.47672 25.293 -10.1657Z`,
        //   },
        //   duration: 15 + index,
        //   start: 1 / imgs.length,
        //   repeat: -1,
        //   ease: 'none',
        // })
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
    })

    return () => ctx.revert()
  }, [width, page, ctx])

  // const heroMemo = useMemo(() => <Hero />, [])
  const DynamicHero = dynamic(()=> import('../components/dom/hero'), {
    loading: () => <HeroLoading>Loading...</HeroLoading>,
    ssr: false
})

  return (
    <div ref={gsapRef} className={lexend.className}>
      <Head>
        <title>{page.seoTitle}</title>
        <meta name='title' content={page.seoTitle} />
        <meta name='description' content={page.seoDescription} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://whosemetaverse.org/' />
        <meta property='og:title' content={page.seoTitle} />
        <meta property='og:description' content={page.seoDescription} />
        <meta property='og:image' content={urlFor(page.seoImage).width(1600).url()} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://whosemetaverse.org/' />
        <meta property='twitter:title' content={page.seoTitle} />
        <meta property='twitter:description' content={page.seoDescription} />
        <meta property='twitter:image' content={urlFor(page.seoImage).width(1600).url()} />
      </Head>
      <HeroLoading>
      <DynamicHero />
      </HeroLoading>
      <Overlay />
      <AboutSection title={page.aboutTitle} body={page.aboutBody} video={page.aboutVideoURL} />
      <FourQuestions questions={page.questions} questionsBody={page.questionsBody} />
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
      <SignUpSection />
      <People people={page.people} title={page.peopleTitle} />
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

const HeroLoading = ({ children }) => <div style={{ height: '100svh' }} id="heroLoading">{children}</div>

const Overlay = forwardRef((props, fRef) => {
  const spacer = 20
  const col = 'var(--color-bg)'
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100dvh',
          zIndex: 5000,
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
            fontSize: '14px',
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
      </div>
      <div
        ref={fRef}
        className={unbounded.className}
        style={{
          position: 'fixed',
          maxWidth: '12vw',
          bottom: spacer,
          left: spacer,
          zIndex: 5000,
          pointerEvents: 'auto',
          fontSize: '0.75em',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        <Button href='mailto:hello@lightshed.io?subject=%5BWhose%20Metaverse%3F%5D'>
          Get in touch
        </Button>
      </div>
    </>
  )
})

Overlay.displayName = 'Overlay'
