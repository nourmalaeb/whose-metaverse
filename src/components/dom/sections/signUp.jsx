import { portableTextComponents } from '@/lib/sanity'
import { unbounded } from '@/styles/fonts'
import { PortableText } from '@portabletext/react'
import { Button } from '../ui'

export const SignUpSection = ({ title = 'Sign up for updates', cta = `Submit` }) => {
  return (
    <section id='signUp'>
      <h2 className={unbounded.className}>{title}</h2>
      <div className={'field'}>
        <label htmlFor='email' name='email'>
          Email
        </label>
        <input name='email' id='email' />
      </div>
      <Button onClick={() => console.log('potato')}>{cta}</Button>
    </section>
  )
}
