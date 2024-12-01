'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import usePageTransitionStore from '@/stores/usePageTransitionStore'

export interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export default function TransitionLink({
  href,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const { isTransitionActive, setIsTransitionActive } = usePageTransitionStore()

  return (
    <Link
      onClick={(e) => {
        e.preventDefault()
        if (isTransitionActive) return // already in transition
        setIsTransitionActive(true) // start transition
        setTimeout(() => {
          router.push(href)
        }, 900)
      }}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
