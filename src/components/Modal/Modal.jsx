import styles from './Modal.module.css'
import { useAircraftContext } from '../../context/AircraftContext'
import CleanButton from '../CleanButton/CleanButton'
import { BsFillTrashFill, BsXLg } from 'react-icons/bs'
import { useAircraftPurchase } from '../../hooks/useAircraftPurchase'
import { Link } from 'react-router-dom'
import { useFormatNumber } from '../../hooks/useFormatNumber'
import { useModalContext } from '../../context/ModalContext'

export default function Modal(){
    const {aircraftToBuy} = useAircraftContext()
    const {display, setDisplay} = useModalContext()
    const { handleDeleteAircraft } = useAircraftPurchase()
    const { formatToMoney } = useFormatNumber()

    return(
        <div className={display ? styles.container : styles.hide}>
            <div className={styles.fade} onClick={() => setDisplay(false)}></div>
            <div className={styles.modal}>
                <div className={styles.cards}>
                    <BsXLg onClick={() => setDisplay(false)} />
                    {aircraftToBuy.length ? aircraftToBuy.map(aircraft => (
                        <div className={styles.card} key={aircraft.id}>
                            <div className={styles.aircraft_image}>
                                <img src={aircraft.imgSrc} alt={aircraft.name} />
                            </div>
                            <div className={styles.description}>
                                <span className={styles.aircraft_name}>{aircraft.name}</span>
                                <span className={styles.aircraft_price}>R${formatToMoney(aircraft.price)}</span>
                                <span>Quantidade: 1</span>
                            </div>
                            <BsFillTrashFill onClick={() => handleDeleteAircraft(aircraft)} />
                        </div>
                    )) : (
                        <p className={styles.empty_cart}>Seu carrinho está vazio.</p>
                    )}
                    {aircraftToBuy.length === 3 && <p>Limite atingido de 3 produtos por compra.</p>}
                </div>
                <div className={styles.buttons}>
                    <Link to="/confirmation">
                        <CleanButton hide={!aircraftToBuy.length} text="Prosseguir com o pedido" onClick={() => setDisplay(false)} />
                    </Link>
                    <CleanButton hide={!aircraftToBuy.length} text="Continuar comprando" bgColor="#fff" textColor="red" onClick={() => setDisplay(false)} />
                </div>
                
            </div>
        </div>
    )
}