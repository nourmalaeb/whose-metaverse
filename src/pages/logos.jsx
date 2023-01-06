import { epilogue, figtree, inter, lexend, unbounded } from '@/styles/fonts'
import styles from '@/styles/logo.module.scss'

const LogoPage = () => {
  return (
    <div className={styles.main}>
      <h1>LOGO OPTIONS</h1>
      <p>Choose your preferred logo</p>
      <LogoSet title={'A - Unbounded'} cn={unbounded.className} />
      <LogoSet title={'B - Lexend'} cn={lexend.className} />
      <LogoSet title={'C - Inter'} cn={inter.className} />
      <LogoSet title={'D - Epilogue'} cn={epilogue.className} />
      {/* <LogoSet title={'Figtree'} cn={figtree.className} /> */}
    </div>
  )
}

export default LogoPage

const LogoSet = ({ title, cn }) => {
  return (
    <div className={styles.logoSet}>
      <h3>{title}</h3>
      <div className={styles.logos}>
        <LogoOption cn={cn} />
        <LogoOption col='gold' bg='black' cn={cn} />
        <LogoOption col='white' bg='black' cn={cn} />
        <LogoOption col='black' bg='white' cn={cn} />
      </div>
    </div>
  )
}

const LogoOption = ({ col = 'black', bg = 'gold', cn = unbounded.className }) => {
  return (
    <div style={{ backgroundColor: bg }} className={styles.logoOptionWrapper}>
      <div className={styles.logoOption}>
        <Bracket topLeft col={col} />
        <Text cn={cn} col={col} />
        <Bracket col={col} />
      </div>
    </div>
  )
}

const Text = ({ cn, col = 'black' }) => (
  <div style={{ color: col }} className={`${cn} ${styles.logoText}`}>
    WHOSE
    <br />
    METAVERSE?
  </div>
)

const Bracket = ({ col = 'black', topLeft }) =>
  topLeft ? (
    <div className={styles.topLeftBracket} style={{ borderColor: col }} />
  ) : (
    <div className={styles.bottomRightBracket} style={{ borderColor: col }} />
  )
