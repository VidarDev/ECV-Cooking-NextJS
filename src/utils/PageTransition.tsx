'use client'

import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import usePageTransitionStore from '@/stores/usePageTransitionStore'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
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
    gsap.to(refTransition.current, {
      opacity: 0,
      duration: 0.6,
      delay: isFirstLoad ? 0.3 : 0,
      onComplete: () => {
        gsap.set(refTransition.current, { visibility: 'hidden' })
        setIsFirstLoad(false)
        setIsTransitionActive(false)
      },
    })
  }

  const _show = () => {
    gsap.set(refTransition.current, { visibility: 'visible', opacity: 0 })

    gsap.to(refTransition.current, {
      opacity: 1,
      duration: 0.6,
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
        className="transition"
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'black',
        }}
      >
        Fuck
      </div>
    </>
  )
}
