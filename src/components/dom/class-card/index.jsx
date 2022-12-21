import Image from 'next/image'
import styles from './styles.module.scss'
import { syne } from '@/styles/fonts'

const Card = ({ title, content, bgcolor = `#150A33`, pic }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image src={pic} alt='' fill />
      </div>
      <div className={styles.content}>
        <h3 className={syne.className}>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default Card
