import { useState } from 'react'
import { unbounded } from '@/styles/fonts'
import { Button } from '../ui'

export const SignUpSection = ({ title = 'Sign up for updates', cta = `Submit` }) => {
  const [formData, setFormData] = useState({ email: '' })
  const [wrongEmail, setWrongEmail] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(null)

  const signUpHandler = async (e) => {
    e.preventDefault()

    console.log(formData)

    if (
      !formData.email ||
      !formData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      )
    ) {
      setWrongEmail(formData.email)
      return
    }

    const res = await fetch('/api/submitEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const content = await res.json()

    setFormData({ email: '' })
    setFormSubmitted(true)
  }

  return (
    <section id='signUp'>
      <h2 className={unbounded.className}>{title}</h2>
      <form>
        <div className={'field'}>
          <label htmlFor='email' name='email'>
            Email
          </label>
          <input
            required
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              setFormSubmitted(false)
            }}
          />
          {formData.email === wrongEmail && (
            <p
              style={{
                color: 'var(--color-hot',
                width: '100%',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              className={unbounded.className}
            >
              Please enter a valid email
            </p>
          )}
          {formSubmitted && !formData.email && (
            <p
              style={{
                color: '#00ff00',
                width: '100%',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              className={unbounded.className}
            >
              Thank you!
            </p>
          )}
        </div>
        <Button type={'submit'} onClick={signUpHandler} disabled={formData.email === wrongEmail}>
          {cta}
        </Button>
      </form>
    </section>
  )
}
