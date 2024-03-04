import { rotonto, league_spartan, unbounded } from '@/styles/fonts'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import styles from './nav-link.module.scss'
import { useGSAP } from '@gsap/react'

export const Navlink = ({ title, subtitle, href, onClick }) => {
  const gsapRef = useRef()

  // marquee animation
  useGSAP(
    () => {
      gsap.fromTo(
        '.gsap-marquee',
        { xPercent: `0` },
        { xPercent: `-20`, duration: 15, repeat: -1, ease: 'none' },
      )
    },
    { scope: gsapRef },
  )

  // hover animation
  const onEnter = (e) => {
    const edge =
      Math.abs(e.clientY - e.target.getBoundingClientRect().top) < 0.5 * e.target.offsetHeight
        ? 50
        : -50
    gsap.to(e.currentTarget.querySelector('.gsap-marquee'), {
      yPercent: edge,
      scaleY: 0,
      duration: 0.2,
    })
  }

  const onLeave = (e) => {
    const edge =
      Math.abs(e.clientY - e.target.getBoundingClientRect().top) < 0.5 * e.target.offsetHeight
        ? 50
        : -50
    gsap.fromTo(
      e.target.querySelector('.gsap-marquee'),
      {
        scaleY: 0,
        yPercent: edge ?? 100,
        duration: 0.2,
      },
      {
        scaleY: 1,
        yPercent: 0,
        duration: 0.2,
      },
    )
  }
  const onTouchEnd = (e) => {
    gsap.fromTo(
      e.target.querySelector('.gsap-marquee'),
      {
        scaleY: 0,
        yPercent: -50,
        duration: 0.2,
      },
      {
        scaleY: 1,
        yPercent: 0,
        duration: 0.2,
      },
    )
  }

  return (
    <a
      className={`${styles.navlink} ${unbounded.className}`}
      href={href}
      onTouchStart={onEnter}
      onMouseEnter={onEnter}
      onTouchEnd={onTouchEnd}
      onMouseLeave={onLeave}
      onClick={onClick}
      ref={gsapRef}
    >
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} gsap-marquee`} aria-hidden='true'>
          <span>{subtitle}</span>
          <span>•</span>
          <span>{subtitle}</span>
          <span>•</span>
          <span>{subtitle}</span>
          <span>•</span>
          <span>{subtitle}</span>
          <span>•</span>
          <span>{subtitle}</span>
          <span>•</span>
        </div>
      </div>
      <div className={styles.link}>
        <span>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
        <span aria-hidden='true'>{title}</span>
        <span aria-hidden='true'>/</span>
      </div>
    </a>
  )
}
