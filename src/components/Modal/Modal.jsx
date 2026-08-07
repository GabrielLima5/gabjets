import styles from './Modal.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useAircraftContext } from '../../context/AircraftContext'
import Button from '../Button/Button'
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
        <AnimatePresence>
            {display && (
                <div className={styles.container}>
                    <motion.div
                        className={styles.fade}
                        onClick={() => setDisplay(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className={styles.modal}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <BsXLg className={styles.close} onClick={() => setDisplay(false)} />
                        <div className={styles.cards}>
                            {aircraftToBuy.length ? aircraftToBuy.map(aircraft => (
                                <div className={styles.card} key={aircraft.id}>
                                    <div className={styles.aircraftImage}>
                                        <img src={aircraft.imgSrc} alt={aircraft.name} />
                                    </div>
                                    <div className={styles.description}>
                                        <span className={styles.aircraftName}>{aircraft.name}</span>
                                        <span className={styles.aircraftPrice}>R${formatToMoney(aircraft.price)}</span>
                                        <span>Quantidade: 1</span>
                                    </div>
                                    <BsFillTrashFill className={styles.trash} onClick={() => handleDeleteAircraft(aircraft)} />
                                </div>
                            )) : (
                                <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
                            )}
                            {aircraftToBuy.length === 3 && <p className={styles.limitMessage}>Limite atingido de 3 produtos por compra.</p>}
                        </div>
                        <div className={styles.buttons}>
                            <Link to="/confirmation">
                                <Button hidden={!aircraftToBuy.length} fullWidth onClick={() => setDisplay(false)}>Prosseguir com o pedido</Button>
                            </Link>
                            <Button hidden={!aircraftToBuy.length} variant="outline" fullWidth onClick={() => setDisplay(false)}>Continuar comprando</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
