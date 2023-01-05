import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'
import {
  Environment,
  useGLTF,
  Instance,
  Instances,
  MeshTransmissionMaterial,
  Loader,
  useTexture,
  Bounds,
} from '@react-three/drei'
import { geodeData } from './data'
import * as THREE from 'three'
import { useWindowSize } from 'react-use'

const Hero = () => {
  const { width } = useWindowSize()
  const geodeNumber = 10 + width / 32
  return (
    <div className={styles.hero}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50, near: 2 }}>
        <color attach='background' args={[0x000000]} />
        <fog attach='fog' args={[0x000000, 9, 20]} />

        <Environment preset='studio' />
        <Bounds fit observe>
          <mesh scale={2}>
            <sphereBufferGeometry args={[1, 64, 64]} />
            {/* <meshStandardMaterial color={'#220022'} /> */}
            <CoolMaterial color={'#000000'} />
          </mesh>
        </Bounds>
        {/* <BoxFrame /> */}
        <Suspense fallback={null}>
          <GeodeInstances01 amount={geodeNumber} />
          <GeodeInstances02 amount={geodeNumber} />
          <GeodeInstances03 amount={geodeNumber} />
          {/* <IPhoneInstances amount={50} /> */}
        </Suspense>
      </Canvas>
      <Loader />
      <Nav />
    </div>
  )
}

export default Hero

const CoolMaterial = ({ color }) => (
  <MeshTransmissionMaterial
    roughness={0.25}
    background={new THREE.Color(color || '#440044')}
    refraction={1.5}
    rgbShift={0.95}
    samples={10}
    resolution={2048}
  />
)

const BoxFrame = () => (
  <group>
    <mesh position={[1.85, 2.5, 0]}>
      <boxBufferGeometry args={[2, 0.2, 1]} />
      <meshStandardMaterial color={0x006666} />
    </mesh>
    <mesh position={[2.75, 1.5, 0]}>
      <boxBufferGeometry args={[0.2, 2, 1]} />
      <meshStandardMaterial color={0x006666} />
    </mesh>
    <mesh position={[-1.85, -2.5, 0]}>
      <boxBufferGeometry args={[2, 0.2, 1]} />
      <meshStandardMaterial color={0x006666} />
    </mesh>
    <mesh position={[-2.75, -1.5, 0]}>
      <boxBufferGeometry args={[0.2, 2, 1]} />
      <meshStandardMaterial color={0x006666} />
    </mesh>
  </group>
)

const GeodeMaterial = ({ color = 0x007799 }) => {
  // const [matcap] = useTexture(['/matcaps/normals']) // normal
  const [matcap] = useTexture([
    'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/black-stone/matcap_black_stone.jpg',
  ]) // black stone
  // const [matcap] = useTexture([
  //   'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/materials/chrome-2/matcap_chrome_2.jpg',
  // ]) // black chrome

  // return <meshStandardMaterial color={color} transparent opacity={0.6} />
  return <meshMatcapMaterial matcap={matcap} />
}

const GeodeInstances01 = ({ radius = 30, amount = 100 }) => {
  const { nodes } = useGLTF('/models/geode-01.glb')
  const geodata = geodeData(radius, amount)
  // console.log(geodata)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.Cube.geometry}>
      {/* <meshNormalMaterial transparent opacity={0.675} /> */}
      <GeodeMaterial />
      {/* <CoolMaterial /> */}
      <group position={[0, 0, -3]} ref={ref}>
        {geodata.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
      </group>
    </Instances>
  )
}

const GeodeInstances02 = ({ radius = 30, amount = 100 }) => {
  const { nodes } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/small-menhir/model.gltf',
  )
  const geodata = geodeData(radius, amount)
  // console.log(geodata)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.menhir_petit.geometry}>
      {/* <meshNormalMaterial transparent opacity={0.675} /> */}
      <GeodeMaterial />
      {/* <CoolMaterial /> */}
      <group position={[0, 0, -3]} ref={ref}>
        {geodata.map((data, i) => (
          <GeodeInstance key={i} {...data} />
        ))}
      </group>
    </Instances>
  )
}

const GeodeInstances03 = ({ radius = 30, amount = 100 }) => {
  const { nodes } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/medium-menhir/model.gltf',
  )
  const geodata = geodeData(radius, amount)
  // console.log(geodata)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.menhir_moyen.geometry}>
      {/* <meshNormalMaterial transparent opacity={0.675} /> */}
      <GeodeMaterial />
      {/* <CoolMaterial /> */}
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
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/medium-menhir/model.gltf',
)
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/small-menhir/model.gltf',
)
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf',
)
