import { motion, useScroll, useSpring } from 'framer-motion'
import styles from './ScrollProgress.module.css'

/**
 * Thin gradient bar fixed to the top of the viewport that fills
 * as the user scrolls through the current page.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 40,
        mass: 0.2,
    })

    return <motion.div className={styles.bar} style={{ scaleX }} />
}
