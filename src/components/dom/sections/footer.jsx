import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'

export const Footer = ({ items }) => {
  return (
    <footer className={unbounded.className}>
      <div className='footer-marquee'>
        <FooterLoop items={items} />
        <FooterLoop items={items} isHidden />
      </div>
    </footer>
  )
}

const FooterItem = ({ item, isHidden }) => (
  <>
    <PortableText
      className={unbounded.className}
      value={item.footerElementContent}
      aria-hidden={isHidden}
    />
    <p aria-hidden>/</p>
  </>
)

const FooterLoop = ({ items, isHidden }) => (
  <>
    {items.map((item, idx) => (
      <FooterItem item={item} isHidden={isHidden} key={idx} />
    ))}
  </>
)
