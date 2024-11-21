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
        // j'empêche le lien de fonctionner
        e.preventDefault()

        // j'évite de superposer des transitions
        if (isTransitionActive) return

        // je déclare globalement qu'une transition se lance
        setIsTransitionActive(true)

        // j'attends un petit temps de sorte à ce que mon animation de sortie
        // se termine puis je push la nouvelle url dans le router
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
