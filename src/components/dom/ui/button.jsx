import cn from 'classnames'
import Link from 'next/link'
import styles from './ui.module.scss'

export const Button = ({ href, onClick, children, center, classes }) => {
  return href ? (
    href.match(/^https?:\/\//) ? (
      <a className={cn(styles.juicyButton, classes)} href={href} center={center}>
        {children}
      </a>
    ) : (
      <Link className={cn(styles.juicyButton, classes)} href={href} center={center}>
        {children}
      </Link>
    )
  ) : (
    <button className={cn(styles.juicyButton, classes)} onClick={onClick} center={center}>
      {children}
    </button>
  )
}
