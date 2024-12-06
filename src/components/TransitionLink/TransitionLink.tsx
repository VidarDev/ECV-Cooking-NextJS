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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (href === pathname || isTransitionActive) return
    setIsTransitionActive(true)
    setTimeout(() => {
      router.push(href)
    }, TRANSITION_DURATION + 100)
  }

  return (
    <Link onClick={handleClick} href={href} {...props}>
      {children}
    </Link>
  )
}
