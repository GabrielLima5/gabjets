import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic'

/**
 * Wrap any element (typically a Button/Link) to make it drift gently
 * toward the cursor while hovered — a subtle "magnetic" feel on premium CTAs.
 */
export default function Magnetic({ children, strength = 0.35, className }) {
    const { ref, style, onMouseMove, onMouseLeave } = useMagnetic(strength)

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ ...style, display: 'inline-block' }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </motion.div>
    )
}
