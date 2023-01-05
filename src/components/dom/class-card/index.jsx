import Image from 'next/image'
import styles from './styles.module.scss'
import { league_spartan } from '@/styles/fonts'
import React from 'react'

const WrappedCard = React.forwardRef(function Card(
  { title, content, bgcolor = `#150A33`, pic, ...props },
  ref,
) {
  return (
    <div className={styles.card} {...props} ref={ref}>
      <div className={styles.cardImage}>
        <Image src={pic} alt='' fill />
      </div>
      <div className={styles.content}>
        <h3 className={league_spartan.className}>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  )
})

export default WrappedCard
