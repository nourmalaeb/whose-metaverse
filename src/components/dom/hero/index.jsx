import { Suspense, memo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Nav } from '../nav'
import styles from './hero.module.scss'
import { useGLTF, Instance, Instances, useTexture } from '@react-three/drei'
import { geodeData } from './data'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Canvas
        className={styles.heroCanvas}
        camera={{ position: [0, 0, 10], fov: 50, near: 2 }}
        resize={{ debounce: 500, offsetSize: true }}
      >
        <Suspense fallback={null}>
          <FadeInEffect />
          <color attach='background' args={[0x000000]} />
          <fog attach='fog' args={[0x000000, 9, 20]} />
          <GeodeInstances01 amount={72} />
          <GeodeInstances02 amount={72} />
        </Suspense>
      </Canvas>
      {/* <Loader /> */}
      <Nav />
    </div>
  )
}

export default memo(Hero)

const FadeInEffect = () => {
  const ref = useRef()
  useFrame((state, delta) => (ref.current.opacity -= delta * 2))

  return (
    <mesh position={[0, 0, 8]} scale={10}>
      <planeGeometry />
      <meshBasicMaterial color={0x000000} ref={ref} transparent={true} />
    </mesh>
  )
}

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
    <Instances geometry={nodes.Cube.geometry} limit={amount} dispose={null}>
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
  const { nodes } = useGLTF('/models/geode-02.glb')
  const geodata = geodeData(radius, amount)
  const ref = useRef()
  useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
  return (
    <Instances geometry={nodes.menhir_petit.geometry} limit={amount} dispose={null}>
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

// const GeodeInstances03 = ({ radius = 30, amount = 100 }) => {
//   const { nodes } = useGLTF(
//     'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/medium-menhir/model.gltf',
//   )
//   const geodata = geodeData(radius, amount)
//   const ref = useRef()
//   useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
//   return (
//     <Instances geometry={nodes.menhir_moyen.geometry} limit={amount}>
//       <GeodeMaterial />
//       <group position={[0, 0, -3]} ref={ref}>
//         {geodata.map((data, i) => (
//           <GeodeInstance key={i} {...data} />
//         ))}
//         <GeodeInstance
//           key={geodata.length + 1}
//           scale={1}
//           speed={geodata[0].speed}
//           position={[1, -1, -5]}
//           rotation={[0, 0, 0]}
//         />
//       </group>
//     </Instances>
//   )
// }

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
    <group scale={scale} position={position} rotation={rotation} dispose={null}>
      <Instance ref={ref} dispose={null} />
    </group>
  )
}

useGLTF.preload('/models/geode-01.glb')
useGLTF.preload('/models/geode-02.glb')
// useGLTF.preload(
//   'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/small-menhir/model.gltf',
// )
