import { useAircraftContext } from '../../context/AircraftContext'
import styles from './PurchaseConfirmationModal.module.css'
import CleanButton from '../CleanButton/CleanButton'
import { useRandomNumber } from '../../hooks/useRandomNumber'
import { useOrderContext } from '../../context/OrderContext'
import { useFormatNumber } from '../../hooks/useFormatNumber'

const PurchaseConfirmationModal = () => {
    const {aircraftToBuy, setAircraftToBuy} = useAircraftContext()
    const {name, setName, setCity, airport, setAirport, setShowConfirmation, totalPrice} = useOrderContext()
    const { formatToMoney } = useFormatNumber()

    const dayForward = new Date().getDate() + 1
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const date = new Date(currentYear, currentMonth, dayForward)
    const month = date.toLocaleString('pt-br', { month: 'long' })

    const { getRandomInt } = useRandomNumber()
    const id = getRandomInt(100000000, 1000000000)

    const cancelCycle = () => {
        setShowConfirmation(false)
        setAircraftToBuy(aircrafts => [])
        setName('')
        setCity('')
        setAirport('')
    }

    return (
        <>
            <div className={styles.fade}></div>
            <div className={styles.modal}>
                <h3>Compra realizada com sucesso!</h3>
                <p>Parabéns {name.trim().split(' ')[0]}! Você acaba de adquirir a(s) seguinte(s) aeronave(s):</p>
                <div className={styles.aircrafts_box}>
                    {aircraftToBuy.map(acft => (
                        <div key={acft.name} className={styles.aircraft_info}>
                            <img src={acft.imgSrc} className={styles.image_box} />
                            <span key={acft.name}>{acft.name}</span>
                        </div>
                    ))}
                </div>
                <p>Vá até o {airport} amanhã, no dia {dayForward} de {month} de {currentYear}, para obter sua(s) aeronave(s). </p>
                <strong>ID da compra: {id}</strong>
                <strong>Preço pago: R${formatToMoney(totalPrice)}</strong>
                <CleanButton text="Fechar" onClick={cancelCycle} />
            </div>
        </>
    )
}

export default PurchaseConfirmationModal