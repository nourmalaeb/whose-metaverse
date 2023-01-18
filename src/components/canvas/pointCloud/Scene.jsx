import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Bounds,
  Center,
  Environment,
  Float,
  OrbitControls,
  Sparkles,
  useGLTF,
} from '@react-three/drei'
import { SurfaceSampler } from './SurfaceSampler'

const key = (() => Math.random())()

function VRBoy(props) {
  const { nodes } = useGLTF('/models/vrboy3.glb')
  const t = useRef()

  // useFrame((state, delta) => (t.current.rotation.y += 0.1 * delta))

  const { viewport } = useThree()

  // useFrame((state, delta) => (potato.current.position.x += delta * Math.random() * 0.01))
  const transformInstance = ({ dummy, sampledMesh, position, normal }) => {
    dummy.scale.setScalar(Math.random() * 0.2)

    const worldPosition = sampledMesh.localToWorld(position)
    dummy.position.copy(worldPosition)
  }

  return (
    <group position={[0.1 * viewport.width, 0, 0]} rotation={[0, 0.25, 0]} ref={t}>
      <SurfaceSampler key={key} transform={transformInstance}>
        <mesh {...props}>
          <primitive object={nodes.Frank.geometry} attach='geometry' />
          {/* <primitive object={nodes.Cube.geometry} attach="geometry" /> */}
          {/* <ComputedAttribute name="upness" compute={computeUpness} usage={StaticReadUsage} /> */}
          {/* <LayerMaterial color="#2e0027" lighting="physical" envMapIntensity={0.1} /> */}
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <instancedMesh args={[null, null, 20_000]}>
          {/* <myGeometry args={[undefined, undefined, 2]} /> */}
          <sphereGeometry args={[0.02, 8]} position={[0, 0, 0]} />
          {/* <LayerMaterial color="#2e0027" lighting="physical" envMapIntensity={0.5}>
            <Depth colorA="#2e0027" colorB="#ffd0d0" near={0.12} far={2} mapping={'world'} />
          </LayerMaterial> */}
          <meshBasicMaterial color='white' />
        </instancedMesh>
      </SurfaceSampler>
      <SurfaceSampler key={key} transform={transformInstance}>
        <mesh {...props}>
          <primitive object={nodes.headset.geometry} attach='geometry' />
          {/* <primitive object={nodes.Cube.geometry} attach="geometry" /> */}
          {/* <ComputedAttribute name="upness" compute={computeUpness} usage={StaticReadUsage} /> */}
          {/* <LayerMaterial color="#2e0027" lighting="physical" envMapIntensity={0.1} /> */}
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <instancedMesh args={[null, null, 40_000]}>
          {/* <myGeometry args={[undefined, undefined, 2]} /> */}
          <sphereGeometry args={[0.02, 8]} position={[0, 0, 0]} />
          {/* <LayerMaterial color="#2e0027" lighting="physical" envMapIntensity={0.5}>
            <Depth colorA="#2e0027" colorB="#ffd0d0" near={0.12} far={2} mapping={'world'} />
          </LayerMaterial> */}
          <meshBasicMaterial color='gold' />
        </instancedMesh>
      </SurfaceSampler>
    </group>
  )
}

const Ambience = ({ c }) => {
  const { size } = useThree()

  return <Sparkles size={5} scale={5} count={size.width / 6} speed={0.1} color={c} />
}

function Scene() {
  const vrBoyMemo = useMemo(() => <VRBoy />, [])
  return (
    <Canvas shadows camera={{ position: [0, 4, 12], fov: 14 }}>
      <Suspense fallback={null}>
        <Float>{vrBoyMemo}</Float>
      </Suspense>
      {/* <Ambience /> */}
      <Ambience c='gold' />
      <Ambience c='#f31c35' />
      {/* <DebugGeometry /> */}
      {/* <color args={['#000000']} attach='background' /> */}
      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export default Scene
