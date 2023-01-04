import { Geode01 } from '@/components/canvas/shapes'
import { Canvas } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'

const Hero = () => (
  <div className={styles.hero}>
    <Canvas>
      <Geode01 scale={0.5} position={[2, 1, 0]} />
      <Geode01 scale={0.5} position={[-3, 1, -1]} />
      <Geode01 scale={0.5} position={[-6, -2, -5]} />
    </Canvas>
    <Nav />
  </div>
)

export default Hero
