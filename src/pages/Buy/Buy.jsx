import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Buy.module.css'
import BrandButton from '../../components/BrandButton/BrandButton'
import Reveal from '../../components/Reveal/Reveal'
import EmbraerLogo from '../../assets/Logo/embraer-logo.png'
import AirbusLogo from '../../assets/Logo/airbus-logo.png'
import BoeingLogo from '../../assets/Logo/boeing-logo.png'
import BoeingAirplane from '../../assets/MainAirplanes/boeing737.jpg'
import EmbraerAirplane from '../../assets/MainAirplanes/embraer-175.jpg'
import AirbusAirplane from '../../assets/MainAirplanes/airbus-a320.jpg'

const BRANDS = [
    { key: 'embraer', name: 'Embraer', logo: EmbraerLogo, image: EmbraerAirplane },
    { key: 'airbus', name: 'Airbus', logo: AirbusLogo, image: AirbusAirplane },
    { key: 'boeing', name: 'Boeing', logo: BoeingLogo, image: BoeingAirplane },
]

export default function Buy(){
    const [activeBrand, setActiveBrand] = useState(BRANDS[0])

    return(
        <div className={styles.buyPage}>
            <Reveal as="h1">Suas Preferências, Nossa Prioridade!</Reveal>
            <Reveal as="p" delay={0.08}>Escolha uma fabricante para começar</Reveal>
            <div className={styles.container}>
                <div className={styles.companies}>
                    {BRANDS.map((brand, index) => (
                        <Reveal key={brand.key} delay={0.15 + index * 0.08} distance={16}>
                            <Link to={`/fleet/${brand.key}`}>
                                <BrandButton
                                    name={brand.name}
                                    logo={brand.logo}
                                    onSelect={() => setActiveBrand(brand)}
                                />
                            </Link>
                        </Reveal>
                    ))}
                </div>
                <div className={styles.image}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeBrand.key}
                            src={activeBrand.image}
                            alt={`Aeronave ${activeBrand.name}`}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
