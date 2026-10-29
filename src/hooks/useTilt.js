import { useRef } from 'react'
/** Subtle 3D tilt on hover. Disabled when the user prefers reduced motion. */
export default function useTilt(max = 8) {
  const ref = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const onMove = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(700px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave, style: { transition: 'transform .15s' } }
}
