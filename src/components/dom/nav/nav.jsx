import { Navlink } from './nav-link'
import styles from './nav-link.module.scss'

export const Nav = () => (
  <nav className={styles.nav} id='nav'>
    <Navlink title={`About`} subtitle={`Emerging Tech Garages for Everyone`} href='#about' />
    <Navlink title={`Communities`} subtitle={`A Community Space`} href='#communities' />
    <Navlink title={`Gallery`} subtitle={`Dream, Tinker, & Create`} href='#gallery' />
    <Navlink
      title={`Curriculum`}
      subtitle={`The Forefront of Technology, Art, & Function`}
      href='#curriculum'
    />
  </nav>
)
