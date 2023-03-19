import cn from 'classnames'
import Link from 'next/link'
import styles from './ui.module.scss'

export const Button = ({ href, onClick, children, center, classes, ...props }) => {
  return href ? (
    href.match(/^https?:\/\//) ? (
      <a className={cn(styles.juicyButton, classes)} href={href} center={center} {...props}>
        {children}
      </a>
    ) : (
      <Link className={cn(styles.juicyButton, classes)} href={href} center={center} {...props}>
        {children}
      </Link>
    )
  ) : (
    <button
      className={cn(styles.juicyButton, classes)}
      onClick={onClick}
      center={center}
      {...props}
    >
      {children}
    </button>
  )
}
