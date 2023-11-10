import { useEffect, useState } from 'react'
import { useAircraftContext } from '../../context/AircraftContext'
import { useNavigate } from 'react-router-dom'
import { useModalContext } from '../../context/ModalContext'
import styles from './OrderConfirmation.module.css'
import Loader from '../../components/Loader/Loader'
import Input from '../../components/Input/Input'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import { brazilStates } from '../../data/brazilStates'
import { useOrderContext } from '../../context/OrderContext'
import { useFormatNumber } from '../../hooks/useFormatNumber'

export default function OrderConfirmation(){
    const {aircraftToBuy} = useAircraftContext()
    const {setDisplay} = useModalContext()
    const {name, city, airport, setName, setCity, setAirport, setShowConfirmation, totalPrice, setTotalPrice} = useOrderContext()
    const { formatToMoney } = useFormatNumber()

    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    
    const getTotalPrice = () => {
        if (aircraftToBuy.length === 1){
            setTotalPrice(formatToMoney(aircraftToBuy.map(acft => acft.price)))
        } else {
            const price = aircraftToBuy.length && aircraftToBuy.reduce((acc, acft) => {
                return formatToMoney(parseInt(acc.price) + parseInt(acft.price))
            })
            setTotalPrice(price)
        }
    }

    useEffect(() => {
        getTotalPrice()
    }, [aircraftToBuy])

    const airports = [
        'Aeroporto Intl. de Guarulhos (GRU/SP)', 
        'Aeroporto Intl. de Viracopos (VCP/SP)',
        'Aeroporto Intl. do Galeão (GIG/RJ)',
    ]

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 5000)

        return(() => clearTimeout(timeout))
    }, [])

    useEffect(() => {
        if (!aircraftToBuy.length) {
            navigate('/fleet')
            setDisplay(false)
        }
    }, [aircraftToBuy, navigate, setDisplay])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !city || !airport) {
            setError('* Campos obrigatórios não preenchidos.')
            return
        }

        setLoading(true)

        setTimeout(() => {
            navigate('/')
        }, 5000)

        setEmail('')
        setShowConfirmation(true)
    }

    return(
        <>
            {loading ? (
                <Loader text="Carregando" />
            ) : (
                <div className={styles.container}>
                    <h1>Confirmação de Pedido</h1>
                    <div className={styles.costumer_data}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h2>Dados do Cliente</h2>
                            <Input name="Nome" type="text" placeholder="Nome" value={name} setValue={setName} />
                            <Input name="Email" type="email" placeholder="Email" value={email} setValue={setEmail} />
                            
                            <div className={styles.localization_inputs}>
                                <Input name="Cidade" placeholder="Cidade" value={city} setValue={setCity} />
                                <label className={styles.state_input}>
                                    <span>Estado</span>
                                    <select required name="state" value={state} onChange={e => setState(e.target.value)}>
                                        <option value="" defaultValue={true}></option>
                                        {brazilStates.map(st => (
                                            <option key={st}>{st}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            
                            <label>
                                <span>Aeroporto mais próximo</span>
                                <select required name="airport" value={airport} onChange={e => setAirport(e.target.value)}>
                                    <option value="" defaultValue={true}></option>
                                    {airports.map(airport => (
                                        <option value={airport} key={airport}>{airport}</option>
                                    ))}
                                </select>
                            </label>
                            <span className="error">{error}</span>
                            <span className={error ? 'hide' : ''} style={{alignSelf: 'flex-start'}}>* Todos os campos são obrigatórios.</span>
                            <div className={styles.button}>
                                <ClassicButton text="Finalizar pedido" />   
                            </div>
                        </form>
                        <div className={styles.cart_info}>
                            <h2>Dados do Pedido</h2>
                            {aircraftToBuy.map(aircraft => (
                                <div className={styles.info_container} key={aircraft.id}>
                                    <div className={styles.aircraft_image}>
                                        <img src={aircraft.imgSrc} alt={aircraft.name} />
                                    </div>
                                    <div className={styles.description}>
                                        <div>
                                            <span>Nome:</span>
                                            <span>Preço:</span>
                                            <span>Quantidade:</span>
                                        </div>
                                        <div>
                                            <span className={styles.aircraft_name}>{aircraft.name}</span>
                                            <span className={styles.aircraft_price}>R${formatToMoney(aircraft.price)}</span>
                                            <span>1</span>
                                        </div>
                                    </div>
                                </div>
                             ))}
                             <span>Preço final:
                                <span className={styles.final_price}> R${totalPrice || '?'}</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
        
    )
}