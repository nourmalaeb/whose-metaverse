import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, ScrollControls, Scroll, useScroll, Image as ImageImpl } from '@react-three/drei'
import Card from '@/components/dom/class-card'

function Image({ c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  useFrame(() => {
    ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.05)
  })
  return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />
}

function Images() {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const group = useRef()
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1
    group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3
    group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3)
    group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
  })
  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[4, height, 1]} url='/img/barry.jpg' />
      <Image position={[2, 0, -2]} scale={3} url='/img/barry.jpg' />
      <Image position={[-2.3, -height, 2]} scale={[1, 3, 1]} url='/img/barry.jpg' />
      <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url='/img/barry.jpg' />
      <Image position={[0.75, -height, 3.5]} scale={1.5} url='/img/barry.jpg' />
      <Image position={[0, -height * 1.5, 2.5]} scale={[1.5, 3, 1]} url='/img/barry.jpg' />
      <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height / 2, 1]} url='/img/barry.jpg' />
    </group>
  )
}

const PotatoCard = () => {
  const potato = useRef()
  const data = useScroll()
  console.log(potato)
  useFrame(() => {
    potato.current.style.scale = 1 + data.range(0, 0.2)
    potato.current.style.top = 1 + data.range(0, 1) * 300 + 'vh'
  })
  return (
    <Card
      title='Introduction to the Metaverse'
      content='Intro class getting acquainted with terms, technology, and real-world applications of Virtual Reality.'
      pic='/img/barry.jpg'
      ref={potato}
      style={{ position: 'absolute' }}
    />
  )
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} style={{ height: '100%' }}>
      <Suspense fallback={null}>
        <ScrollControls damping={4} pages={4}>
          <Scroll>
            <Images />
            <mesh>
              <planeBufferGeometry args={[3, 2]} />
              <meshBasicMaterial color='blue' />
            </mesh>
          </Scroll>
          <Scroll html>
            <PotatoCard />
            <h1 style={{ position: 'absolute', top: '60vh', left: '0.5em' }}>WHOSE</h1>
            <h1 style={{ position: 'absolute', top: '120vh', left: '60vw' }}>META</h1>
            <h1 style={{ position: 'absolute', top: '198.5vh', left: '0.5vw', fontSize: '40vw' }}>VERSE?</h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  )
}
