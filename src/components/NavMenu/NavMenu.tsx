import TransitionLink from '@/components/TransitionLink'
import navigations from '@/data/navigation.json'
import styles from './navmenu.module.scss'

const NavMenu = () => (
  <ul className="navbar">
    {navigations.map(({ url, name }) => (
      <li key={url} className={`${styles.navmenu} text-white font-bold`}>
        <TransitionLink href={url}>{name}</TransitionLink>
      </li>
    ))}
  </ul>
)

export default NavMenu
