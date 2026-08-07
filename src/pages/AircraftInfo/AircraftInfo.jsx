import { useParams } from 'react-router-dom'
import styles from './AircraftInfo.module.css'
import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal/Reveal'
import { useAircraftPurchase } from '../../hooks/useAircraftPurchase'
import { useFormatNumber } from '../../hooks/useFormatNumber'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../components/Loader/Loader'

const SPECS = [
    { key: 'length', label: 'Comprimento' },
    { key: 'wingspan', label: 'Envergadura' },
    { key: 'height', label: 'Altura' },
    { key: 'fuelCapacity', label: 'Capacidade de combustível' },
    { key: 'range', label: 'Autonomia' },
    { key: 'maxTakeoffWeight', label: 'Peso máximo de decolagem' },
    { key: 'maxSpeed', label: 'Velocidade máxima' },
    { key: 'passengersQty', label: 'Qtd. máxima de passageiros' },
]

const DESCRIPTION_POINTS = [1, 2, 3, 4, 5, 6]

export default function AircraftInfo(){
    const { id } = useParams()
    const { aircrafts, loading, error } = useFetch()
    const { handleAddAircraftToBuy } = useAircraftPurchase()
    const { formatToMoney } = useFormatNumber()

    if (loading) return <Loader />
    if (error) return <p className="error">{error}</p>

    const aircraft = aircrafts.find(item => +item.id === +id)
    if (!aircraft) return null

    return(
        <div className={styles.container}>
            <div className={styles.details}>
                <Reveal className={styles.image} distance={20}>
                    <img src={aircraft.imgSrc} alt={aircraft.name} />
                </Reveal>
                <Reveal className={styles.info} delay={0.1} distance={20}>
                    <h1>{aircraft.name}</h1>
                    <ul>
                        {SPECS.map(({ key, label }) => (
                            <li key={key}>{label}: <b>{aircraft.specs[key]}</b></li>
                        ))}
                    </ul>
                    <h2>R${formatToMoney(aircraft.price)}</h2>
                    <span className={styles.paymentMessage}>*** á vista</span>
                    <Button onClick={() => handleAddAircraftToBuy(aircraft)}>Comprar</Button>
                </Reveal>
            </div>
            <div className={styles.description}>
                <Reveal as="h3">Descrição</Reveal>
                <Reveal as="h4" delay={0.05}>{aircraft.description.title}</Reveal>
                <Reveal as="p" delay={0.1}>{aircraft.description.introduction}</Reveal>
                <ul className={styles.points}>
                    {DESCRIPTION_POINTS.map((n, index) => (
                        <Reveal as="li" key={n} delay={Math.min(index, 4) * 0.08} distance={16}>
                            <strong>{aircraft.description[`point${n}`]}</strong>
                            <p>{aircraft.description[`argPoint${n}`]}</p>
                        </Reveal>
                    ))}
                </ul>
                <p>{aircraft.description.endText1}</p>
                <p>{aircraft.description.endText2}</p>
            </div>
        </div>
    )
}
