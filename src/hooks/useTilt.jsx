import { useEffect, useRef } from 'react'

/**
 * Subtle 3D tilt-toward-pointer effect for cards, driven entirely through
 * CSS custom properties (no React state / re-renders) so it stays smooth
 * even with many cards on screen at once. No-ops on touch devices.
 */
export function useTilt({ max = 8, lift = -8 } = {}) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

        let frame = null

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width
            const py = (e.clientY - rect.top) / rect.height
            const rx = (0.5 - py) * max * 2
            const ry = (px - 0.5) * max * 2

            if (frame) cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                el.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`)
                el.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`)
                el.style.setProperty('--tilt-lift', `${lift}px`)
            })
        }

        const handleLeave = () => {
            if (frame) cancelAnimationFrame(frame)
            el.style.setProperty('--tilt-rx', '0deg')
            el.style.setProperty('--tilt-ry', '0deg')
            el.style.setProperty('--tilt-lift', '0px')
        }

        el.addEventListener('pointermove', handleMove)
        el.addEventListener('pointerleave', handleLeave)

        return () => {
            el.removeEventListener('pointermove', handleMove)
            el.removeEventListener('pointerleave', handleLeave)
            if (frame) cancelAnimationFrame(frame)
        }
    }, [max, lift])

    return ref
}
