'use client'

import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import usePageTransitionStore from '@/stores/usePageTransitionStore'
import { TransitionPageProps } from './types'

export default function TransitionPage({ children }: TransitionPageProps) {
  const pathname = usePathname()
  const refPage = useRef(null)
  const refTransition = useRef(null)

  const {
    isTransitionActive,
    setIsTransitionActive,
    isFirstLoad,
    setIsFirstLoad,
  } = usePageTransitionStore()

  const _hide = () => {
    const tl = gsap.timeline()

    tl.set(refTransition.current, {
      xPercent: -100,
    }).to(refTransition.current, {
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsFirstLoad(false)
        setIsTransitionActive(false)
      },
    })
  }

  const _show = () => {
    const tl = gsap.timeline()

    tl.set(refTransition.current, {
      xPercent: 0,
    }).to(refTransition.current, {
      duration: 1.2,
      ease: 'power2.inOut',
    })
  }

  useGSAP(() => {
    // When I change routes, I play the entrance animation
    // and refresh ScrollTrigger
    ScrollTrigger.refresh()
    _hide()
  }, [pathname])

  useGSAP(() => {
    // Code specific to the first visit to the site
    if (isFirstLoad) {
      gsap.set(refTransition.current, { opacity: 1 })
    }
  }, [isFirstLoad])

  useGSAP(() => {
    // Each time isTransitionActive is set to true, I play
    // the exit animation
    if (isTransitionActive) {
      _show()
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
