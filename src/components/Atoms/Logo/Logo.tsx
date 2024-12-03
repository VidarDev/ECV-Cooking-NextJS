import Image from 'next/image'
import TransitionLink from '@/components/Atoms/TransitionLink'

export default function Logo() {
  return (
    <TransitionLink href="/">
      <Image src="/img/Logo.svg" alt="" width={50} height={50} />
    </TransitionLink>
  )
}
