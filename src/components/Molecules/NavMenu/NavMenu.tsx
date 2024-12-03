import TransitionLink from '@/components/Atoms/TransitionLink'

import navigations from '@/data/navigation.json'
import styles from './navmenu.module.scss'

export default function Logo() {
  return (
    <ul className="navbar">
      {navigations.map((nav, index) => (
        <li key={index} className={`${styles.navmenu} text-white font-bold`}>
          <TransitionLink href={nav.url}>{nav.name}</TransitionLink>
        </li>
      ))}
    </ul>
  )
}
