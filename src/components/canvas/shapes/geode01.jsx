import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Geode01 = (props) => {
  const g1 = useRef()
  const { nodes } = useGLTF('/models/geode-01.glb')
  useFrame((state, delta) => {
    g1.current.rotation.y += delta * 0.25
    g1.current.rotation.z -= delta * 0.1
  })
  return (
    <group {...props}>
      <group dispose={null} ref={g1}>
        <mesh geometry={nodes.Cube.geometry} rotation={[0.5, 0.5, 0]} scale={2}>
          <meshNormalMaterial />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/shape-01.glb')
