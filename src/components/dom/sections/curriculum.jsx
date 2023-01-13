import { Common } from '@/components/canvas/common'
import { Forefront } from '@/components/canvas/shapes'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export const CurriculumSection = ({ title, body, courses }) => {
  return (
    <section id='curriculum' className='simple vert'>
      <div className='column'>
        <div style={{ width: 100, height: 100 }}>
          <Canvas camera={{ position: [20, 0, 20], fov: 20 }}>
            <Center scale={3}>
              <Common />
              <Forefront />
            </Center>
          </Canvas>
        </div>
        <h2 className={`sectionTitle ${unbounded.className}`}>{title}</h2>
        <PortableText value={body} />
      </div>
      <div className='courseCarouselContainer'>
        <div className='courseCarousel'>
          <Courses courses={courses} />
          <div aria-hidden>
            <Courses courses={courses} />
          </div>
        </div>
      </div>
    </section>
  )
}

const Courses = ({ courses }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 80,
        justifyContent: 'space-around',
        paddingBottom: 80,
        alignItems: 'center',
      }}
    >
      {courses.map((course, idx) => (
        <Course
          title={course.courseTitle}
          description={course.courseDescription}
          key={`course-${idx}`}
        />
      ))}
    </div>
  )
}

const Course = ({ title, description }) => {
  return (
    <div className='course'>
      <h4 className={unbounded.className}>{title}</h4>
      {description && <PortableText value={description} />}
    </div>
  )
}

const courseTitles = [
  'Introduction to the Metaverse',

  'Virtual Reality',

  'Game Design Basics',

  'Digital Game Design',

  'Impact Game Design',

  'How To Think About The Future',

  '360 Video',

  'Augmented Reality',

  'Holograms',

  'Digital Marketing',

  'Digital Race Lab',

  'Artificial Intelligence',

  'Digital Mindfulness',

  'Leadership',

  'Creativity',

  'Horizon Worlds',
]
