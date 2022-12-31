import H1 from './H1'
import { Navlink } from '../nav'
import styles from './styles.module.scss'

const Header = () => {
  return (
    <header>
      <H1 title={'Whose Metaverse?'} />
      <nav className={styles.nav}>
        <Navlink title={`About`} subtitle={`Web3 Garages for Everyone`} href='#about' />
        <Navlink title={`Communities`} subtitle={`A Community Space`} href='#communities' />
        <Navlink title={`Gallery`} subtitle={`Dream, Tinker, & Create`} href='#gallery' />
        <Navlink
          title={`Curriculum`}
          subtitle={`The Forefront of Technology, Art, & Function`}
          href='#curriculum'
        />
      </nav>
    </header>
  )
}

export default Header
