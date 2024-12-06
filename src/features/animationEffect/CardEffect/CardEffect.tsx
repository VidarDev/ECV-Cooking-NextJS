'use client'
import React, { useEffect, useState, useRef } from 'react'
import { CardEffectProps, CardProps } from './types'
import { gsap } from 'gsap'
import Image from 'next/image'
import array from '@/data/images.json'

export default function CardEffect({
  target,
  distanceThreshold = 100,
  cardLifetime = 1000,
  maxCards = 8,
}: CardEffectProps) {
  const [cards, setCards] = useState<CardProps[]>([])
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null)
  const animatedCards = useRef<Set<string>>(new Set())

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setCards((prevCards) =>
        prevCards.filter((card) => now - card.createdAt < cardLifetime),
      )
    }, 100)

    return () => clearInterval(cleanupInterval)
  }, [cardLifetime])

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setCards((prevCards) =>
        prevCards.filter((card) => now - card.createdAt < cardLifetime),
      )
    }, 100)

    return () => clearInterval(cleanupInterval)
  }, [cardLifetime])

  useEffect(() => {
    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    const findTargetElement = (
      element: HTMLElement | null,
    ): HTMLElement | null => {
      while (element) {
        if (element.classList && element.classList.contains(target)) {
          return element
        }
        element = element.parentElement
      }
      return null
    }

    const createCardsGroup = (x: number, y: number, elementId: string) => {
      const now = Date.now()
      const newCard: CardProps = {
        x,
        y,
        id: `${elementId}-${now}`,
        img: array[Math.floor(Math.random() * array.length)],
        createdAt: now,
        rotation:
          Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
      }

      setCards((prev) => {
        const updatedCards = [...prev, newCard]
        return updatedCards.slice(-maxCards)
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const targetElement = findTargetElement(e.target as HTMLElement)
      if (!targetElement) return

      const currentPosition = { x: e.clientX, y: e.clientY }
      const elementId = targetElement.id || 'default'

      if (!lastPositionRef.current) {
        lastPositionRef.current = currentPosition
        return
      }

      const distance = calculateDistance(
        lastPositionRef.current.x,
        lastPositionRef.current.y,
        currentPosition.x,
        currentPosition.y,
      )

      if (distance >= distanceThreshold) {
        createCardsGroup(currentPosition.x, currentPosition.y, elementId)
        lastPositionRef.current = currentPosition
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const targetElement = findTargetElement(e.target as HTMLElement)
      if (targetElement) {
        lastPositionRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const targetElement = findTargetElement(e.target as HTMLElement)
      if (targetElement) {
        lastPositionRef.current = null
      }
    }

    document.querySelectorAll(`.${target}`).forEach((element, index) => {
      if (!element.id) element.id = `${target}-${index}`
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [target, distanceThreshold, maxCards])

  useEffect(() => {
    cards.forEach((card) => {
      if (animatedCards.current.has(card.id)) return

      const element = document.getElementById(card.id)
      if (element) {
        animatedCards.current.add(card.id)

        gsap.fromTo(
          element,
          {
            opacity: 0,
            scale: 0.8,
            rotation: 0,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: card.rotation,
            duration: 0.3,
            ease: 'power2.out',
          },
        )

        gsap.to(element, {
          opacity: 0,
          scale: 0.8,
          rotation: card.rotation * 2,
          duration: 0.3,
          delay: cardLifetime / 1000 - 0.3,
          ease: 'power2.in',
          onComplete: () => {
            animatedCards.current.delete(card.id)
          },
        })
      }
    })
  }, [cards, cardLifetime])

  return (
    <>
      {cards.map((card) => (
        <Image
          src={card.img}
          alt="card"
          width={170}
          height={250}
          id={card.id}
          key={card.id}
          className="fixed pointer-events-none object-cover border-2 border-black rounded-lg"
          style={{
            position: 'absolute',
            left: `${card.x}px`,
            top: `${card.y}px`,
            width: '170px',
            height: '250px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
          }}
        />
      ))}
    </>
  )
}
