import styles from './AircraftCard.module.css'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import { Link } from 'react-router-dom'
import { useAircraftPurchase } from '../../hooks/useAircraftPurchase'
import { useFormatNumber } from '../../hooks/useFormatNumber'

export default function AircraftCard({aircraft}){
    const { handleAddAircraftToBuy } = useAircraftPurchase()
    const { formatToMoney } = useFormatNumber()

    return(
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={aircraft.imgSrc} alt={aircraft.name} />
            </div>
            <div className={styles.description}>
                <div className={styles.name}>{aircraft.name}</div>
                <div className={styles.price}><span className={styles.currency}>R$</span>{formatToMoney(aircraft.price)}</div>
                <div className={styles.payment_message}>*** á vista</div>
            </div>
            <div className={styles.buttons}>
                <ClassicButton text="Comprar" onClick={() => handleAddAircraftToBuy(aircraft)} fontSize={1} />
                <Link to={`/aircraft/${aircraft.id}`}>
                    <ClassicButton text="Detalhes" fontSize={1} />
                </Link>
            </div>
        </div>
    )
}