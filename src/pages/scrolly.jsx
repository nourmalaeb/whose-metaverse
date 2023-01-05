import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Preload,
  ScrollControls,
  Scroll,
  useScroll,
  Image as ImageImpl,
  useGLTF,
} from '@react-three/drei'
import Header from '@/config'
import { Navlink } from '@/components/dom/nav'
import styles from '@/styles/scrollStyle.module.scss'
import { rotonto } from '@/styles/fonts'

// number of pages
const pages = 4
// helper to set height on page
// x = height from top
// p = page number
const rTop = (x, p = 0) => `${x + p * 100}vh`

function Image({ c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  useFrame(() => {
    ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.05)
  })
  return (
    <ImageImpl
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    />
  )
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
      <Image
        position={[0, -height * 2 - height / 4, 0]}
        scale={[width, height / 2, 1]}
        url='/img/barry.jpg'
      />
    </group>
  )
}

const Shape01 = (props) => {
  const s1 = useRef()
  const { nodes, materials } = useGLTF('/models/shape-01.glb')
  useFrame(() => (s1.current.rotation.y += 0.005))
  return (
    <group {...props}>
      <pointLight position={[1, 1, 1]} />
      <group dispose={null} ref={s1}>
        <mesh geometry={nodes.Cube.geometry}>
          <meshLambertMaterial color='white' />
        </mesh>
      </group>
    </group>
  )
}

const Nav = () => {
  const scroller = useScroll()
  console.log('POO', scroller)
  return (
    <nav className={styles.nav}>
      <Navlink
        title={`About`}
        subtitle={`Emerging Tech Garages for Everyone`}
        href='#about'
        onClick={() => scroller.el.scrollTo({ top: '20%' })}
      />
      <Navlink
        title={`Communities`}
        subtitle={`A Community Space`}
        href='#communities'
        onClick={() => (scroller.scroll.current = 2 / 0.75 / pages)}
      />
      <Navlink title={`Gallery`} subtitle={`Dream, Tinker, & Create`} href='#gallery' />
      <Navlink
        title={`Curriculum`}
        subtitle={`The Forefront of Technology, Art, & Function`}
        href='#curriculum'
      />
    </nav>
  )
}

const HeroSection = () => {
  const hero = useRef()
  const data = useScroll()
  console.log(data)
  useFrame(() => {
    // hero.current.style.height = `${100 - 100 * data.range(0, 1 / pages)}vh`
    // hero.current.style.top = `${0 + 75 * data.range(0, 1 / pages)}vh`
    // hero.current.style.padding = `${2.5 * (1 - data.range(0, 1 / pages))}vmax`
  })

  return (
    <div
      ref={hero}
      style={{
        position: 'absolute',
        left: 0,
        width: '100vw',
        height: '100dvh',
        // backgroundColor: 'red',
        // opacity: 0.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2vmax',
        }}
      >
        <h1
          style={{
            fontSize: '10vmax',
            fontWeight: 900,
            margin: 0,
            // textAlign: 'center',
            lineHeight: 0.9,
            // letterSpacing: '-0.05em',
          }}
        >
          WHOSE METAVERSE?
        </h1>
      </div>
      <Nav scroller={data} />
    </div>
  )
}

function Overlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        zIndex: 20,
      }}
    >
      <div style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}>
        WHOSE
        <br />
        METAVERSE?
      </div>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>WHOSE</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>
        METAVERSE?
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className={rotonto.className}>
      <Overlay />
      <Header />
      <Canvas
        // gl={{ antialias: true }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={pages}>
            <Scroll>
              {/* <Images /> */}
              <Shape01 position={[-1, 0, 3]} />
            </Scroll>
            <Scroll html>
              <HeroSection />
              {/* <Nav /> */}
              <div
                style={{
                  position: 'absolute',
                  border: '2px solid blue',
                  width: '100vw',
                  height: '100vh',
                  top: '100vh',
                  left: 0,
                  right: 0,
                }}
              >
                <h4
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    color: 'blue',
                    margin: 0,
                    fontSize: 66,
                  }}
                >
                  ONE
                </h4>
              </div>
              <div
                style={{
                  position: 'absolute',
                  border: '2px solid red',
                  width: '100vw',
                  height: '100vh',
                  top: '200vh',
                  left: 0,
                  right: 0,
                }}
              >
                <h4
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    color: 'red',
                    margin: 0,
                    fontSize: 66,
                  }}
                >
                  TWO
                </h4>
              </div>
              <div
                style={{
                  position: 'absolute',
                  border: '2px solid green',
                  width: '100vw',
                  height: '100vh',
                  top: '300vh',
                  left: 0,
                  right: 0,
                }}
              >
                <h4
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    color: 'green',
                    margin: 0,
                    fontSize: 66,
                  }}
                >
                  THREE
                </h4>
              </div>
              <h3 style={{ position: 'absolute', top: rTop(80, 1), left: '0.5em' }}>WHOSE</h3>
              <h3 style={{ position: 'absolute', top: rTop(20, 2), left: '60vw' }}>META</h3>
              <h3
                style={{
                  position: 'absolute',
                  top: rTop(-20, 2),
                  left: '0.5vw',
                  fontSize: '30vw',
                }}
              >
                VERSE?
              </h3>
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  )
}
