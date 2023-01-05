const randomVector = (r) => [
  +(r / 2 - Math.random() * r).toFixed(2),
  +(r / 2 - Math.random() * r).toFixed(2),
  0,
]
const randomEuler = () => [
  +(Math.random() * Math.PI).toFixed(2),
  +(Math.random() * Math.PI).toFixed(2),
  +(Math.random() * Math.PI).toFixed(2),
]

const geodeData = (r = 10, l = 10) => {
  return Array.from({ length: l }, () => ({
    position: randomVector(r),
    rotation: randomEuler(),
    scale: +(Math.random() + 0.25).toFixed(2),
    speed: Math.random().toFixed(2),
  }))
}

const fixedData = [
  {
    position: [-6.8, 1.97, 0],
    rotation: [1.3, 3.13, 2.91],
    scale: 0.79,
    speed: '0.18',
  },
  {
    position: [-7.49, 8.13, 0],
    rotation: [0.63, 1.18, 2.18],
    scale: 0.45,
    speed: '0.96',
  },
  {
    position: [-9.25, 9.7, 0],
    rotation: [1.03, 0.15, 0.56],
    scale: 0.6,
    speed: '0.82',
  },
  {
    position: [7.17, 5.46, 0],
    rotation: [0.06, 1.65, 1.86],
    scale: 1.16,
    speed: '0.64',
  },
  {
    position: [3.09, -5.67, 0],
    rotation: [0.77, 0.09, 2.98],
    scale: 0.62,
    speed: '0.56',
  },
  {
    position: [-9.54, 2.89, 0],
    rotation: [0.99, 0.31, 2.14],
    scale: 0.46,
    speed: '0.14',
  },
  {
    position: [2.95, -9.43, 0],
    rotation: [1.31, 1.77, 1.79],
    scale: 1.18,
    speed: '0.23',
  },
  {
    position: [5.75, 0.52, 0],
    rotation: [1.03, 0.97, 0.93],
    scale: 1.18,
    speed: '0.73',
  },
  {
    position: [-7.92, 0.14, 0],
    rotation: [1.98, 0.35, 1.95],
    scale: 0.32,
    speed: '0.81',
  },
  {
    position: [4.28, 9.97, 0],
    rotation: [2.48, 3.1, 2.61],
    scale: 0.36,
    speed: '0.97',
  },
  {
    position: [-0.81, 2.52, 0],
    rotation: [0.16, 0.51, 2.42],
    scale: 0.47,
    speed: '0.79',
  },
  {
    position: [-4.56, -8.13, 0],
    rotation: [2.19, 1.09, 0.84],
    scale: 1.2,
    speed: '0.09',
  },
  {
    position: [3.21, 0.69, 0],
    rotation: [2.69, 1.64, 1.89],
    scale: 1.02,
    speed: '0.37',
  },
  {
    position: [7.12, -3.23, 0],
    rotation: [1.48, 0.86, 1.26],
    scale: 1.21,
    speed: '0.87',
  },
  {
    position: [3.87, -6.52, 0],
    rotation: [1.43, 1.91, 3.09],
    scale: 0.7,
    speed: '0.52',
  },
  {
    position: [-4.48, -1.24, 0],
    rotation: [2.81, 1.85, 0.6],
    scale: 1.15,
    speed: '0.32',
  },
  {
    position: [-4.98, 2.67, 0],
    rotation: [2.91, 2.35, 1.84],
    scale: 0.28,
    speed: '0.03',
  },
  {
    position: [-0.05, 7.58, 0],
    rotation: [3.05, 1.87, 2.27],
    scale: 0.54,
    speed: '0.51',
  },
  {
    position: [-8.97, 4.31, 0],
    rotation: [0.85, 2.12, 0.49],
    scale: 0.51,
    speed: '0.32',
  },
  {
    position: [-6.67, -2.82, 0],
    rotation: [2.92, 2.27, 2.22],
    scale: 0.52,
    speed: '0.72',
  },
]

export { geodeData, fixedData }
