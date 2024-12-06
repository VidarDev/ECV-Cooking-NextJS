import { SearchBar } from '@/features/filters/SearchBar'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import styles from './header.module.scss'

const Header = () => (
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

export default Header
