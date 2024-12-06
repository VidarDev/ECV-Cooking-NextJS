import { RefObject, useEffect } from 'react'

export default function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    const events = ['mousedown', 'touchstart']
    events.forEach((event) =>
      document.addEventListener(event, listener as EventListener),
    )

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, listener as EventListener),
      )
    }
  }, [ref, handler])
}
