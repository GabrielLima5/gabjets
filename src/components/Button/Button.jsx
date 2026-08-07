import { useState } from 'react'
import styles from './Button.module.css'

/**
 * Single button primitive used across the app.
 * Adds a lightweight ripple on click; pairs with <Magnetic> for CTAs
 * that should drift toward the pointer.
 */
export default function Button({
    children,
    text,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    hidden = false,
    pulse = false,
}) {
    const [ripples, setRipples] = useState([])

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const rippleSize = Math.max(rect.width, rect.height)
        const ripple = {
            id: `${Date.now()}-${Math.random()}`,
            x: e.clientX - rect.left - rippleSize / 2,
            y: e.clientY - rect.top - rippleSize / 2,
            size: rippleSize,
        }
        setRipples((current) => [...current, ripple])
        onClick?.(e)
    }

    const removeRipple = (id) => {
        setRipples((current) => current.filter((r) => r.id !== id))
    }

    const className = [
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        hidden && styles.hidden,
        pulse && styles.pulse,
    ].filter(Boolean).join(' ')

    return (
        <button type={type} onClick={handleClick} className={className}>
            <span className={styles.label}>{children ?? text}</span>
            <span className={styles.rippleLayer} aria-hidden="true">
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        className={styles.ripple}
                        style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
                        onAnimationEnd={() => removeRipple(r.id)}
                    />
                ))}
            </span>
        </button>
    )
}
