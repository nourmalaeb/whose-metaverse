import { portableTextComponents } from '@/lib/sanity'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import cn from 'classnames'

export const FourQuestions = ({ questions = [], questionsBody }) => {
  return (
    <section id='fourQuestions'>
      <div className='questionsQuestions'>
        {questions.map((question, idx) => (
          <div className='questionContainer' key={`question-${idx}`}>
            <h2 className={cn(unbounded.className, 'question')}>
              <span>{question}</span>
              <span aria-hidden>{question}</span>
              <span aria-hidden>{question}</span>
            </h2>
          </div>
        ))}
      </div>
      <div className='questionsContentWrapper'>
        <div className='questionsContent'>
          <PortableText value={questionsBody} components={portableTextComponents} />
        </div>
      </div>
    </section>
  )
}
