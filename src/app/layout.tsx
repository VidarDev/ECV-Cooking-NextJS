import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.scss'
import { Header } from '@/components/Header'

const reemKufiSans = localFont({
  src: './fonts/Reem-kufi.woff2',
  variable: '--font-reem-kufi-sans',
  weight: '400 700',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${reemKufiSans.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
