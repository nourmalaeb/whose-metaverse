import * as THREE from 'three'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import styles from './styles.module.scss'
import { Html, OrbitControls, useGLTF } from '@react-three/drei'
import { useMouse } from 'react-use'

export default function Cubes() {
  const mouseRef = useRef(null)
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse(mouseRef)

  const x = (-(0.5 * elW - elX) * 1.5) / elW
  const y = (0.5 * elH - elY) / elH
  return (
    <div className={styles.container} ref={mouseRef}>
      <Canvas dpr={[1, 1.5]} orthographic camera={{ position: [0, 10, 20], zoom: 80, near: 0.02, far: 1000 }}>
        {/* <Box position={[0, y ? y : 0, 0]} rotation={[0, 0, 0]} /> */}
        <Boxes />
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight position={[0, 2, 5]} intensity={0.5} />
        <directionalLight position={[2, 2, -5]} intensity={0.5} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={-0.25}
          zoomSpeed={0.25}
          dampingFactor={0.05}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (mesh.current.rotation.y += delta * 0.1))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[6, 2, 2]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

const o = new THREE.Object3D()
const c = new THREE.Color()
const repeats = 900
const data = Array.from({ length: repeats }, () => ({ color: 'gold', scale: 1 }))

function Boxes() {
  const [hovered, setHovered] = useState()
  const meshRef = useRef()
  const prevRef = useRef()
  const colorArray = useMemo(
    () => Float32Array.from(new Array(repeats).fill().flatMap((_, i) => c.set(data[i].color).toArray())),
    [],
  )

  useEffect(() => void (prevRef.current = hovered), [hovered])

  useEffect(() => {
    let i = 0
    for (let x = 0; x < 30; x++)
      for (let y = 0; y < 30; y++) {
        const id = i++
        o.position.set(40 - x * 3, 0, 30 - y * 2)
        const scale = (data[id].scale = THREE.MathUtils.lerp(data[id].scale, id === hovered ? 2.5 : 1, 0.1))
        o.scale.setScalar(scale)
        o.updateMatrix()
        meshRef.current.setMatrixAt(id, o.matrix)
      }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, repeats]}
      onPointerMove={(e) => (e.stopPropagation(), setHovered(e.instanceId))}
      onPointerOut={(e) => setHovered(undefined)}>
      <boxBufferGeometry args={[2, 0.5, 0.5]}>
        <instancedBufferAttribute attach='attributes-color' args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshStandardMaterial color={'gold'} />
    </instancedMesh>
  )
}
