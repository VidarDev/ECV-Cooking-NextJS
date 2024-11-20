import Image from 'next/image'
import Link from 'next/link'

import { CardProps } from './types'

import styles from './card.module.scss'

const Card = ({ title, difficulty, slug }: CardProps) => {
  return (
    <article className={styles.card}>
      <div>
        <Image
          src={`https://picsum.photos/seed/${difficulty}/200/200`}
          alt={title}
          width={200}
          height={200}
        />
        <div>
          <h1>
            <Link href={`/recipe/${slug}`}>{title}</Link>
          </h1>
        </div>
      </div>
    </article>
  )
}

export default Card
