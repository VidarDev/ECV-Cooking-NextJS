import Image from 'next/image'
import TransitionLink from '@/components/TransitionLink'

const Logo = () => (
  <TransitionLink href="/">
    <Image src="/img/Logo.svg" alt="Logo" width={50} height={50} />
  </TransitionLink>
)

export default Logo
