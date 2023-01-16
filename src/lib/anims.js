import { useMemo } from 'react'
import gsap from 'gsap'

export const useGsapContext = (scope) => {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope])
  return ctx
}
