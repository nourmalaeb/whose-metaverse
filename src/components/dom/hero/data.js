const randomVector = (r) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, 0]
const randomEuler = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
]

const geodeData = (r = 10, l = 10) => {
  return Array.from({ length: l }, () => ({
    position: randomVector(r),
    rotation: randomEuler(),
    scale: Math.random() + 0.25,
    speed: Math.random(),
  }))
}

export { geodeData }
