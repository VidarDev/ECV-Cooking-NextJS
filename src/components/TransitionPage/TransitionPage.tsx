'use client'

import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useCallback } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import usePageTransitionStore from '@/stores/usePageTransitionStore'
import { TransitionPageProps } from './types'

export default function TransitionPage({ children }: TransitionPageProps) {
  const pathname = usePathname()
  const refPage = useRef<HTMLDivElement>(null)
  const refTransition = useRef<HTMLDivElement>(null)

  const {
    isTransitionActive,
    setIsTransitionActive,
    isFirstLoad,
    setIsFirstLoad,
  } = usePageTransitionStore()

  const hideTransition = useCallback(() => {
    gsap
      .timeline()
      .set(refTransition.current, { xPercent: -100 })
      .to(refTransition.current, {
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsFirstLoad(false)
          setIsTransitionActive(false)
        },
      })
  }, [setIsFirstLoad, setIsTransitionActive])

  const showTransition = () => {
    gsap
      .timeline()
      .set(refTransition.current, { xPercent: 0 })
      .to(refTransition.current, {
        duration: 1.2,
        ease: 'power2.inOut',
      })
  }

  useEffect(() => {
    ScrollTrigger.refresh()
    hideTransition()
  }, [pathname, hideTransition])

  useEffect(() => {
    if (isFirstLoad) {
      gsap.set(refTransition.current, { opacity: 1 })
    }
  }, [isFirstLoad])

  useEffect(() => {
    if (isTransitionActive) {
      showTransition()
    }
  }, [isTransitionActive])

  return (
    <>
      <div ref={refPage} key={pathname}>
        {children}
      </div>
      <div
        ref={refTransition}
        className="transition w-screen fixed h-screen bg-black top-0 left-0"
        style={{ zIndex: 200 }}
      ></div>
    </>
  )
}
