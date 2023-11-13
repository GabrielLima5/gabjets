import { useEffect, useState } from 'react'
import styles from './Buy.module.css'
import EmbraerLogo from '../../assets/Logo/embraer-logo.png'
import AirbusLogo from '../../assets/Logo/airbus-logo.png'
import BoeingLogo from '../../assets/Logo/boeing-logo.png'

import BoeingAirplane from '../../assets/MainAirplanes/boeing737.jpg'
import EmbraerAirplane from '../../assets/MainAirplanes/embraer-175.jpg'
import AirbusAirplane from '../../assets/MainAirplanes/airbus-a320.jpg'
import BrandButton from '../../components/BrandButton/BrandButton'
import { Link } from 'react-router-dom'
import { useAircraftContext } from '../../context/AircraftContext'

export default function Buy(){
    const [image, setImage] = useState(EmbraerAirplane)
    const { scrollTop } = useAircraftContext()

    const handleLogo = (e) => {
        switch(e.target.parentNode.dataset.airplane){
            case "embraer":
                setImage(EmbraerAirplane)
                break;

            case "airbus":
                setImage(AirbusAirplane)
                break;

            case "boeing":
                setImage(BoeingAirplane)
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        scrollTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className={styles.buy_page}>
            <h1>Suas Preferências, Nossa Prioridade!</h1>
            <p>Escolha uma fabricante para começar</p>
            <div className={styles.container}>
                <div className={styles.companies}>
                    <Link to="/fleet/embraer">
                        <BrandButton dataset="embraer" handleLogo={handleLogo} logo={EmbraerLogo} />
                    </Link>
                    <Link to="/fleet/airbus">
                        <BrandButton dataset="airbus" handleLogo={handleLogo} logo={AirbusLogo} />
                    </Link>
                    <Link to="/fleet/boeing">
                        <BrandButton dataset="boeing" handleLogo={handleLogo} logo={BoeingLogo} />
                    </Link>
                </div>
                <div className={styles.image}>
                    <img src={image} alt="Airplane" />
                </div>
            </div>
        </div>
    )
}