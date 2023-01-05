import { useState, useRef, useEffect, useMemo, createContext, useContext } from 'react'
import { Geode01 } from '@/components/canvas/shapes'
import { Canvas, useFrame } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'
import * as THREE from 'three'
import { Environment, useGLTF, Merged, Instance, Instances } from '@react-three/drei'
import { geodeData } from './data'

const Hero = () => (
  <div className={styles.hero}>
    <Canvas>
      <Environment preset='studio' />
      {/* <Geode01 scale={0.5} position={[2, 1, 0]} />
      <Geode01 scale={0.5} position={[-3, 1, -1]} />
      <Geode01 scale={0.5} position={[-6, -2, -5]} /> */}
      {/* <Geodes /> */}
      <GeodeInstances />
    </Canvas>
    <Nav />
  </div>
)

export default Hero

export function GeodeInstances() {
  const { nodes } = useGLTF('/models/geode-01.glb')
  return (
    <Instances geometry={nodes.Cube.geometry}>
      <meshNormalMaterial />
      <group position={[0, 0, 0]}>
        {geodeData(20, 20).map((data, i) => (
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
