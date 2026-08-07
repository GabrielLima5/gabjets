import styles from './AircraftCard.module.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useAircraftPurchase } from '../../hooks/useAircraftPurchase'
import { useFormatNumber } from '../../hooks/useFormatNumber'
import { useTilt } from '../../hooks/useTilt'

export default function AircraftCard({aircraft}){
    const { handleAddAircraftToBuy } = useAircraftPurchase()
    const { formatToMoney } = useFormatNumber()
    const tiltRef = useTilt({ max: 6, lift: -10 })

    return(
        <article className={styles.card} ref={tiltRef}>
            <div className={styles.image}>
                <img src={aircraft.imgSrc} alt={aircraft.name} loading="lazy" />
            </div>
            <div className={styles.description}>
                <h3 className={styles.name}>{aircraft.name}</h3>
                <div className={styles.price}>
                    <span className={styles.currency}>R$</span>{formatToMoney(aircraft.price)}
                </div>
                <span className={styles.paymentMessage}>*** á vista</span>
            </div>
            <div className={styles.buttons}>
                <Button size="sm" onClick={() => handleAddAircraftToBuy(aircraft)}>Comprar</Button>
                <Link to={`/aircraft/${aircraft.id}`}>
                    <Button variant="outline" size="sm">Detalhes</Button>
                </Link>
            </div>
        </article>
    )
}
