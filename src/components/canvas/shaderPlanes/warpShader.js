import { useRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, shaderMaterial } from '@react-three/drei'
import { Vector3 } from 'three'
// import glsl from 'babel-plugin-glsl/macro'

export const WarpShaderScene = () => (
  <Canvas orthographic={true} dpr={1}>
    <ShaderObject />
  </Canvas>
)

const ShaderObject = () => {
  const mesh = useRef()

  const { size } = useThree()

  useFrame((state, delta) => {
    mesh.current.material.uniforms.time.value += delta
  })

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry args={[size.width, size.height]} />
      {/* <warpMaterial resolution={[size.width * 0.125, size.height * 0.125, 1]} /> */}
      <neuronMaterial resolution={[size.width, size.height, 1]} />
    </mesh>
  )
}

const WarpMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new Vector3(),
  },
  `
varying vec2 vUv;

void main()	{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`,
  `
uniform vec3 resolution;
uniform float time;

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
	float s = 0.0, v = 0.0;
  vec2 uv = (-resolution.xy + .175 * fragCoord.xy) / resolution.y;
  float t = (time+29.) * 0.125;
  uv.x += sin(t) * .3;
  float si = sin(t*1.5); // ...Squiffy rotation matrix!
  float co = cos(t);
  uv *= mat2(co, si, -si, co);
  vec3 col = vec3(0.0);
  vec3 init = vec3(0.25, 0.25 + sin(time * 0.001) * .1, time * 0.0008);
  for (int r = 0; r < 100; r++)
  {
    vec3 p = init + s * vec3(uv, 0.143);
    p.z = mod(p.z, .10);
    for (int i=0; i < 10; i++)	p = abs(p * 2.04) / dot(p, p) - 0.75;
    v += length(p * p) * smoothstep(0.0, 0.5, 0.9 - s) * .001;
    // Get a purple and cyan effect by biasing the RGB in different ways...
    col +=  vec3(v * 0.8, 1.1 - s * 0.5, .7 + v * 0.75) * v * 0.013;
    s += .01;
  }

	fragColor = vec4(col, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,
)

extend({ WarpMaterial })

const NeuronMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new Vector3(),
  },
  `
varying vec2 vUv;

void main()	{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`,
  `
uniform vec3 resolution;
uniform float time;

float DistLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float t = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
    
    return length(pa - ba*t);
}

float N21(vec2 p) {
	p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p + 23.45);
    
    return fract(p.x * p.y);
}

vec2 N22(vec2 p) {
	float n = N21(p);
    
    return vec2(n, N21(p + n));
}

float speed = .4;

vec2 GetPos(vec2 id, vec2 offs) {
    vec2 n = N22(id + offs);
    
    return offs + sin(n * speed * time) * .4;
}

float Line(vec2 p, vec2 a, vec2 b) {
	float d = DistLine( p, a, b);
    float m = smoothstep(.03, .01, d);
    float d2 = length(a-b);
    m *= smoothstep(1., .0, d2) * .5 + smoothstep(.05, .03, abs(d2 - .75));
    
    return m;
}

float Layer(vec2 uv) {
    float m = .0;
    vec2 gv = fract(uv) - .5;
    vec2 id = floor(uv);

    vec2 p[9];
    int i = 0;
    for(float y=-1.; y<=1.; y++) {
        for(float x=-1.; x<=1.; x++, i++) {
            p[i] = GetPos(id, vec2(x, y));
        }
    }

    for(int i=0; i<9; i++) {
        m += Line(gv, p[4], p[i]);

        vec2 j = (p[i] - gv) * 20.;
        float sparkle = 1./dot(j, j);
        m += sparkle * ( sin(speed * time + fract(p[i].x) * 10.) * .4 + .4);
    }
    m += Line(gv, p[1], p[3]);
    m += Line(gv, p[1], p[5]);
    m += Line(gv, p[5], p[7]);
    m += Line(gv, p[7], p[3]);
    
    return m;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - .5*resolution.xy)/resolution.y;
    
    float gradient = uv.y - 0.15;
    
    float m = 0.0;
    float t = time * speed * .1;

    float s = sin(t);
    float c = cos(t);
    mat2 rot = mat2(c, -s, s, c); 
    uv *= rot;

    
    for(float i=0.; i<= 1.; i+= 1./4.) {
        float z = fract(i + t);
        float size = mix(10., .5, z);
        float fade = smoothstep(0., .5, z) * smoothstep(1.2, .8, z);
        m += Layer(uv * size + i * 20.) * fade;
    }
        
    vec3 base = sin((t * t + 100.) * vec3(.945, .0, .1657)) * .99 + .6;

    vec3 col = base * m * 0.5;
       
    fragColor = vec4(col, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,
)

extend({ NeuronMaterial })
