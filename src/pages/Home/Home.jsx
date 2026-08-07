import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import styles from './Home.module.css'
import Button from '../../components/Button/Button'
import Magnetic from '../../components/Magnetic/Magnetic'
import aircraftImage from '../../assets/Home/home-aircraft.jpg'
import PurchaseConfirmationModal from '../../components/PurchaseConfirmationModal/PurchaseConfirmationModal'
import { useOrderContext } from '../../context/OrderContext'

const SLOGAN_WORDS = 'Você e seu avião: distantes por um clique.'.split(' ')

const sloganContainer = {
    animate: { transition: { staggerChildren: 0.09, delayChildren: 0.9 } },
}

const sloganWord = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home(){
    const { showConfirmation } = useOrderContext()
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -60])
    const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

    return(
        <>
            <AnimatePresence>
                {showConfirmation && <PurchaseConfirmationModal />}
            </AnimatePresence>
            <section className={styles.home} ref={heroRef}>
                <div className={styles.blob1} aria-hidden="true" />
                <div className={styles.blob2} aria-hidden="true" />
                <div className={styles.particles} aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className={styles.particle} style={{ '--i': i }} />
                    ))}
                </div>

                <div className={styles.hero}>
                    <div className={styles.texts}>
                        <motion.span
                            className={styles.tag}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Aviação executiva de próxima geração
                        </motion.span>

                        <motion.h1
                            className={styles.companyName}
                            initial={{ opacity: 0, y: 24, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            GabJets
                        </motion.h1>

                        <motion.p
                            className={styles.slogan}
                            variants={sloganContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {SLOGAN_WORDS.map((word, i) => (
                                <motion.span key={i} className={styles.word} variants={sloganWord}>
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.9 }}
                        >
                            <Magnetic>
                                <Link to="/fleet">
                                    <Button size="lg" pulse>Veja nosso catálogo</Button>
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </div>

                    <motion.div
                        className={styles.aircraftImage}
                        initial={{ opacity: 0, x: 60, rotate: 2 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div style={{ y: imageY, opacity: imageOpacity }}>
                            <img src={aircraftImage} alt="Aeronave executiva" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
