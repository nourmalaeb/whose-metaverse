import { unbounded } from '@/styles/fonts'
import classNames from 'classnames'

export const People = ({ title = 'Made possible by', people = [] }) => {
  return (
    <section id='people'>
      <div className='leftSide'>
        <h2 className={unbounded.className}>{title}</h2>
      </div>
      <div className='rightSide'>
        {people.map((person, idx) => (
          <div className={classNames('person', { isShiny: person.isShiny })} key={person._key}>
            <h4>{person.name}</h4>
            <p>{person.superpower}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
