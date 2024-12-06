import { SearchBar } from '@/features/filters/SearchBar'
import Logo from '@/components/Atoms/Logo'

import styles from './header.module.scss'
import NavMenu from '@/components/Molecules/NavMenu'

export default function Header() {
  return (
    <header
      className={`${styles.header} fixed bottom-2 left-1/2 -translate-x-1/2 bg-black z-50 md:top-2 md:bottom-auto`}
    >
      <nav className={`${styles.container} flex justify-between items-center`}>
        <Logo />
        <NavMenu />
        <SearchBar />
      </nav>
    </header>
  )
}
