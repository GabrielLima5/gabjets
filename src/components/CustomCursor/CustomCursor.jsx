import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, select, textarea, [data-cursor-hover]'
const CURSOR_RADIUS = 10

export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false)
    const [hovering, setHovering] = useState(false)
    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
    const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

    useEffect(() => {
        const isFinePointer = window.matchMedia('(pointer: fine)').matches
        if (!isFinePointer) return

        setEnabled(true)
        document.documentElement.classList.add('custom-cursor-active')

        const handleMove = (e) => {
            x.set(e.clientX - CURSOR_RADIUS)
            y.set(e.clientY - CURSOR_RADIUS)
        }
        const handleOver = (e) => {
            if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true)
        }
        const handleOut = (e) => {
            if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false)
        }

        window.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseover', handleOver)
        document.addEventListener('mouseout', handleOut)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseover', handleOver)
            document.removeEventListener('mouseout', handleOut)
            document.documentElement.classList.remove('custom-cursor-active')
        }
    }, [x, y])

    if (!enabled) return null

    return (
        <motion.div
            className={styles.cursor}
            style={{ x: springX, y: springY }}
            animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 1 : 0.7 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        />
    )
}
