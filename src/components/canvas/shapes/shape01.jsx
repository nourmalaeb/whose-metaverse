import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Shape01 = (props) => {
  const s1 = useRef()
  const { nodes } = useGLTF('/models/shape-01.glb')
  useFrame((state, delta) => {
    s1.current.rotation.y += delta * 0.5
    s1.current.rotation.z -= delta * 0.1
  })
  return (
    <group {...props}>
      {/* <pointLight position={[1, 1, 1]} /> */}
      <group dispose={null} ref={s1}>
        <mesh geometry={nodes.Cube.geometry} rotation={[0.5, 0.5, 0]} scale={2}>
          <meshNormalMaterial />
        </mesh>
      </group>
    </group>
    // <primitive object={scene} {...props} />
  )
}

useGLTF.preload('/models/shape-01.glb')
