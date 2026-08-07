import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Makes an element drift slightly toward the pointer while hovered,
 * springing back to rest on leave. Desktop-only by nature (no touch events).
 */
export function useMagnetic(strength = 0.35) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

    const onMouseMove = (e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
    }

    const onMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave }
}
