import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import aircraftImage from '../../assets/Home/home-aircraft.jpg'
import PurchaseConfirmationModal from '../../components/PurchaseConfirmationModal/PurchaseConfirmationModal'
import { useOrderContext } from '../../context/OrderContext'
import { useAircraftContext } from '../../context/AircraftContext'
import { useEffect } from 'react'

export default function Home(){
    const { showConfirmation } = useOrderContext()
    const { scrollTop } = useAircraftContext()

    useEffect(() => {
        scrollTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {showConfirmation && <PurchaseConfirmationModal />}
            <section className={styles.home}>
                <div className={styles.homepage}>
                    <div className={styles.texts}>
                        <span className={styles.company_name}>GabJets</span>
                        <span className={styles.slogan}>Você e seu avião: distantes por um clique.</span>
                    </div>
                    <div className={styles.aircraft_image}>
                        <img src={aircraftImage} alt="Aircraft" />
                    </div>
                </div>
                <Link to="/fleet">
                    <ClassicButton text='Veja nosso catálogo' />
                </Link>
            </section>
        </>
    )
}