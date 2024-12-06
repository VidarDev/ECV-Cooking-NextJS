export interface CardEffectProps {
  target: string
  distanceThreshold?: number
  cardLifetime?: number
  maxCards?: number
}

export interface CardProps {
  x: number
  y: number
  id: string
  img: string
  createdAt: number
  rotation: number
}
