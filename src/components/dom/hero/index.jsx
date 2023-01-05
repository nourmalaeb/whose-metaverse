import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'
import { Environment, useGLTF, Instance, Instances } from '@react-three/drei'
import { fixedData } from './data'

const Hero = () => (
  <div className={styles.hero}>
    <Canvas>
      <Environment preset='studio' />
      <GeodeInstances />
    </Canvas>
    <Nav />
  </div>
)

export default Hero

export function GeodeInstances() {
  const { nodes } = useGLTF('/models/geode-01.glb')
  // const geodata = geodeData(20, 20)
  // console.log(geodata)
  return (
    <Instances geometry={nodes.Cube.geometry}>
      <meshNormalMaterial />
      <group position={[0, 0, 0]}>
        {fixedData.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
      </group>
    </Instances>
  )
}

const GeodeInstance = ({ scale, speed, position, rotation }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.25 * speed
    ref.current.rotation.z -= delta * 0.1 * speed
  })

  return (
    <group scale={scale} position={position} rotation={rotation}>
      <Instance ref={ref} />
    </group>
  )
}

useGLTF.preload('/models/geode-01.glb')
