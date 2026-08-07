import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Fades + slides its children into place the first time they scroll
 * into view. Pass `delay` (seconds) to stagger items in a list/grid.
 */
export default function Reveal({
    children,
    as = 'div',
    delay = 0,
    distance = 28,
    duration = 0.6,
    once = true,
    amount = 0.2,
    className,
    ...rest
}) {
    const Component = motion[as] ?? motion.div

    return (
        <Component
            className={className}
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            {...rest}
        >
            {children}
        </Component>
    )
}
