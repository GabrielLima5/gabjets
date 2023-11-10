import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import aircraftImage from '../../assets/Home/home-aircraft.jpg'
import PurchaseConfirmationModal from '../../components/PurchaseConfirmationModal/PurchaseConfirmationModal'
import { useOrderContext } from '../../context/OrderContext'

export default function Home(){
    const { showConfirmation } = useOrderContext()
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