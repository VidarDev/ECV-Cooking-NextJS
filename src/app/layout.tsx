import GSAP from '@/lib/gsap'
import type { Metadata } from 'next'
import { Merienda } from 'next/font/google'

import Header from '@/components/Header'
import TransitionPage from '@/components/TransitionPage'

import './globals.scss'
import MouseFollower from '@/lib/CursorFollower'
import CardEffect from '@/features/animationEffect/CardEffect'

const merienda = Merienda({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${merienda.className} antialiased`}>
        <TransitionPage>
          <GSAP>
            <CardEffect target="cards-effect" distanceThreshold={150} />
            <Header />
            {children}
          </GSAP>
          <div id="scroll-progress" />
        </TransitionPage>
        <MouseFollower />
      </body>
    </html>
  )
}
