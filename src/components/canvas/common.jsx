import { Environment } from '@react-three/drei'

export const Common = ({ color }) => (
  <>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[2, 3, 1]} intensity={1} />
    <pointLight position={[-1, -1, -1]} color='magenta' />
    <Environment preset='dawn' />
  </>
)
