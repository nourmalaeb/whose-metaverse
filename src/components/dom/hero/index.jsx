import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'
import { Environment, useGLTF, Instance, Instances } from '@react-three/drei'
import { fixedData, geodeData } from './data'

const Hero = () => (
  <div className={styles.hero}>
    <Canvas camera={{ position: [0, 0, 10], fov: 50, near: 2 }}>
      <Environment preset='studio' />
      <mesh scale={1.75}>
        <icosahedronBufferGeometry />
        <meshStandardMaterial color={'black'} />
      </mesh>
      <group>
        <mesh position={[1.85, 2.5, 0]}>
          <boxBufferGeometry args={[2, 0.2, 1]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
        <mesh position={[2.75, 1.5, 0]}>
          <boxBufferGeometry args={[0.2, 2, 1]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
      </group>
      <group>
        <mesh position={[-1.85, -2.5, 0]}>
          <boxBufferGeometry args={[2, 0.2, 1]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
        <mesh position={[-2.75, -1.5, 0]}>
          <boxBufferGeometry args={[0.2, 2, 1]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
      </group>
      <GeodeInstances />
    </Canvas>
    <Nav />
  </div>
)

export default Hero

export function GeodeInstances() {
  const { nodes } = useGLTF('/models/geode-01.glb')
  const geodata = geodeData(30, 400)
  console.log(geodata)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.Cube.geometry}>
      <meshNormalMaterial transparent opacity={0.675} />
      <group position={[0, 0, -3]} ref={ref}>
        {geodata.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
      </group>
    </Instances>
  )
}

const GeodeInstance = ({ scale, speed, position, rotation }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + speed * 10000
    ref.current.rotation.set(Math.cos(t / 4) / 2, Math.sin(t / 4) / 2, Math.cos(t / 1.5) / 2)
    ref.current.position.y = Math.sin(t / 1.5) / 2
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
