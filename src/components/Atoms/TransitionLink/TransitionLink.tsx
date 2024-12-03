'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import usePageTransitionStore from '@/stores/usePageTransitionStore'
import { TransitionLinkProps } from './types'
import { TRANSITION_DURATION } from '@/config/constants'

export default function TransitionLink({
  href,
  children,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isTransitionActive, setIsTransitionActive } = usePageTransitionStore()

  return (
    <Link
      onClick={(e) => {
        e.preventDefault()
        if (href === pathname) return // same page
        if (isTransitionActive) return // already in transition
        setIsTransitionActive(true) // start transition
        setTimeout(() => {
          router.push(href)
        }, TRANSITION_DURATION / 2)
      }}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
