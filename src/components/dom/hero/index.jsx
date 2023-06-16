import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'
import { Environment, useGLTF, Instance, Instances, useTexture } from '@react-three/drei'
import { geodeData } from './data'
import { useWindowSize, useMountedState } from 'react-use'
import { useState, useEffect } from 'react'
// import ParticleScene from '../../canvas/particles/ParticleScene'
// import { WarpShaderScene } from '@/components/canvas/shaderPlanes/warpShader'

const Hero = () => {
  const [geodeNumber, setGeodeNumber] = useState(null)
  useEffect(() => setGeodeNumber(24 + window.innerWidth / 32), [])

  if (!geodeNumber) return null
  return (
    <div className={styles.hero}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50, near: 2 }}>
        <color attach='background' args={[0x000000]} />
        <fog attach='fog' args={[0x000000, 9, 20]} />
        <Suspense fallback={null}>
          <Environment preset='dawn' />
          <GeodeInstances01 amount={geodeNumber} />
          <GeodeInstances02 amount={geodeNumber} />
          <GeodeInstances03 amount={geodeNumber} />
        </Suspense>
      </Canvas>
      <Nav />
    </div>
  )
}

export default Hero

const GeodeMaterial = () => {
  const [matcap] = useTexture(['/matcaps/gem-green.png']) // green stone

  return <meshMatcapMaterial matcap={matcap} />
}

const GeodeInstances01 = ({ radius = 30, amount = 100 }) => {
  const { nodes } = useGLTF('/models/geode-01.glb')
  const geodata = geodeData(radius, amount)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.Cube.geometry} limit={amount}>
      <GeodeMaterial />
      <group position={[0, 0, -3]} ref={ref}>
        {geodata.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
        <GeodeInstance
          key={geodata.length + 1}
          scale={1}
          speed={geodata[0].speed}
          position={[3, 1, -5]}
          rotation={[0, 0, 0]}
        />
      </group>
    </Instances>
  )
}

const GeodeInstances02 = ({ radius = 30, amount = 100 }) => {
  const { nodes } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/small-menhir/model.gltf',
  )
  const geodata = geodeData(radius, amount)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.menhir_petit.geometry} limit={amount}>
      <GeodeMaterial />
      <group position={[0, 0, -3]} ref={ref}>
        {geodata.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
        <GeodeInstance
          key={geodata.length + 1}
          scale={1}
          speed={geodata[0].speed}
          position={[0, 0, -5]}
          rotation={[0, 0, 0]}
        />
      </group>
    </Instances>
  )
}

const GeodeInstances03 = ({ radius = 30, amount = 100 }) => {
  const { nodes } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/medium-menhir/model.gltf',
  )
  const geodata = geodeData(radius, amount)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.menhir_moyen.geometry} limit={amount}>
      <GeodeMaterial />
      <group position={[0, 0, -3]} ref={ref}>
        {geodata.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
        <GeodeInstance
          key={geodata.length + 1}
          scale={1}
          speed={geodata[0].speed}
          position={[1, -1, -5]}
          rotation={[0, 0, 0]}
        />
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
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/medium-menhir/model.gltf',
)
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/small-menhir/model.gltf',
)
