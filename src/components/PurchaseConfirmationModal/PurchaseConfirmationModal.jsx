import { motion } from 'framer-motion'
import { useAircraftContext } from '../../context/AircraftContext'
import styles from './PurchaseConfirmationModal.module.css'
import Button from '../Button/Button'
import { useRandomNumber } from '../../hooks/useRandomNumber'
import { useOrderContext } from '../../context/OrderContext'
import { useFormatNumber } from '../../hooks/useFormatNumber'

const PurchaseConfirmationModal = () => {
    const {aircraftToBuy, setAircraftToBuy} = useAircraftContext()
    const {name, setName, airport, setAirport, setShowConfirmation, totalPrice} = useOrderContext()
    const { formatToMoney } = useFormatNumber()
    const { getRandomInt } = useRandomNumber()

    const pickupDate = new Date()
    pickupDate.setDate(pickupDate.getDate() + 1)
    const day = pickupDate.getDate()
    const month = pickupDate.toLocaleString('pt-br', { month: 'long' })
    const year = pickupDate.getFullYear()

    const id = getRandomInt(100000000, 1000000000)

    const cancelCycle = () => {
        setShowConfirmation(false)
        setAircraftToBuy([])
        setName('')
        setAirport('')
    }

    return (
        <div className={styles.overlay}>
            <motion.div
                className={styles.fade}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className={`${styles.modal} glass-panel`}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <h3>Compra realizada com sucesso!</h3>
                <p>Parabéns {name.trim().split(' ')[0]}! Você acaba de adquirir a(s) seguinte(s) aeronave(s):</p>
                <div className={styles.aircraftsBox}>
                    {aircraftToBuy.map(acft => (
                        <div key={acft.id} className={styles.aircraftInfo}>
                            <img src={acft.imgSrc} alt={acft.name} className={styles.imageBox} />
                            <span>{acft.name}</span>
                        </div>
                    ))}
                </div>
                <p>Vá até o {airport} amanhã, no dia {day} de {month} de {year}, para obter sua(s) aeronave(s). </p>
                <strong>ID da compra: {id}</strong>
                <strong>Preço pago: R${formatToMoney(totalPrice)}</strong>
                <Button onClick={cancelCycle}>Fechar</Button>
            </motion.div>
        </div>
    )
}

export default PurchaseConfirmationModal
