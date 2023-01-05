import { syne, rotonto } from '@/styles/fonts'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import styles from './nav-link.module.scss'

export const Navlink = ({ title, subtitle, href, onClick }) => {
  const gsapRef = useRef()

  // marquee animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-marquee',
        { xPercent: `0` },
        { xPercent: `-20`, duration: 15, repeat: -1, ease: 'none' },
      )
    }, gsapRef)
    return () => ctx.revert()
  }, [])

  // hover animation
  const onEnter = (e) => {
    const edge =
      Math.abs(e.clientY - e.currentTarget.getBoundingClientRect().top) <
      0.5 * e.target.offsetHeight
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
      Math.abs(e.clientY - e.currentTarget.getBoundingClientRect().top) <
      0.5 * e.target.offsetHeight
        ? 50
        : -50
    gsap.fromTo(
      e.currentTarget.querySelector('.gsap-marquee'),
      {
        scaleY: 0,
        yPercent: edge,
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
      className={`${styles.navlink} ${syne.className}`}
      href={href}
      onMouseEnter={onEnter}
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
