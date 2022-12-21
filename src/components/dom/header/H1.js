import gsap from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import { useEffect, useRef } from 'react'
import Container from '../../canvas/container/container'
import styles from './styles.module.scss'
import { Unbounded } from '@next/font/google'

const unbounded = Unbounded({ subsets: ['latin'] })

gsap.registerPlugin(CustomEase)

const h1Ease = CustomEase.create(
  'custom',
  'M0,0,C0.14,0,0.174,0.05,0.2,0.1,0.237,0.172,0.194,0.953,0.304,0.984,0.362,1,0.434,1,1,1',
)

const H1 = ({ title }) => {
  const gsapRef = useRef()

  useEffect(() => {
    let anim = gsap.fromTo(
      gsapRef.current,
      {
        scale: 100,
        background: '#FF2F54',
        color: '#FF2F54',
      },
      {
        background: 'transparent',
        color: '#000',
        scale: 1,
        duration: 2,
        ease: h1Ease,
      },
    )

    return () => {
      anim.kill()
    }
  }, [])

  return (
    <div className={styles.headerTop}>
      <h1 className={`${styles.siteTitle} ${unbounded.className}`} ref={gsapRef}>
        {title}
      </h1>
      <Container />
    </div>
  )
}

export default H1
