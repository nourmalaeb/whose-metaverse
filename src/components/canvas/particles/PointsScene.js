import { OrbitControls, Points, useFBO } from '@react-three/drei'
import { Canvas, useFrame, extend, createPortal } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
// import './scene.css'

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, -2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, -5]} />
      <Points>
        <sphereBufferGeometry />
        <pointsMaterial />
      </Points>
      <mesh position={[-4, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color='red' />
      </mesh>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
        // autoRotate
        // autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

export default Scene
