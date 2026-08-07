import { useEffect, useState } from 'react'
import { useAircraftContext } from '../../context/AircraftContext'
import { useNavigate } from 'react-router-dom'
import { useModalContext } from '../../context/ModalContext'
import styles from './OrderConfirmation.module.css'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal/Reveal'
import { useOrderContext } from '../../context/OrderContext'
import { useFormatNumber } from '../../hooks/useFormatNumber'

const AIRPORTS = [
    'Aeroporto Intl. de Guarulhos (GRU/SP)',
    'Aeroporto Intl. de Viracopos (VCP/SP)',
    'Aeroporto Intl. do Galeão (GIG/RJ)',
]

export default function OrderConfirmation(){
    const {aircraftToBuy} = useAircraftContext()
    const {setDisplay} = useModalContext()
    const {name, airport, setName, setAirport, setShowConfirmation, totalPrice, setTotalPrice} = useOrderContext()
    const { formatToMoney } = useFormatNumber()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const total = aircraftToBuy.reduce((sum, aircraft) => sum + aircraft.price, 0)
        setTotalPrice(total)
    }, [aircraftToBuy, setTotalPrice])

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 3000)
        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        if (!aircraftToBuy.length) {
            navigate('/fleet')
            setDisplay(false)
        }
    }, [aircraftToBuy, navigate, setDisplay])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !airport) {
            setError('* Preencha seu nome e o aeroporto mais próximo.')
            return
        }

        setLoading(true)
        setShowConfirmation(true)

        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    if (loading) return <Loader text="Preparando sua reserva" />

    return(
        <div className={styles.container}>
            <Reveal as="h1">Confirmação de Pedido</Reveal>
            <div className={styles.customerData}>
                <Reveal as="form" onSubmit={handleSubmit} className={`${styles.form} glass-panel`} delay={0.1} distance={20}>
                    <h2>Dados para retirada</h2>
                    <p className={styles.formHint}>Só precisamos de duas informações para reservar sua aeronave.</p>
                    <Input name="Nome completo" type="text" placeholder="Seu nome" value={name} setValue={setName} />

                    <Select
                        label="Aeroporto mais próximo"
                        value={airport}
                        onChange={setAirport}
                        options={AIRPORTS}
                        placeholder="Selecione um aeroporto"
                    />
                    <span className="error">{error}</span>
                    <div className={styles.button}>
                        <Button type="submit" fullWidth>Finalizar pedido</Button>
                    </div>
                </Reveal>
                <Reveal className={`${styles.cartInfo} glass-panel`} delay={0.2} distance={20}>
                    <h2>Resumo do pedido</h2>
                    {aircraftToBuy.map(aircraft => (
                        <div className={styles.infoContainer} key={aircraft.id}>
                            <div className={styles.aircraftImage}>
                                <img src={aircraft.imgSrc} alt={aircraft.name} />
                            </div>
                            <div className={styles.description}>
                                <span className={styles.aircraftName}>{aircraft.name}</span>
                                <span className={styles.aircraftPrice}>R${formatToMoney(aircraft.price)}</span>
                            </div>
                        </div>
                     ))}
                     <span className={styles.finalPriceRow}>Preço final
                        <span className={styles.finalPrice}>R${totalPrice != null ? formatToMoney(totalPrice) : '?'}</span>
                    </span>
                </Reveal>
            </div>
        </div>
    )
}
