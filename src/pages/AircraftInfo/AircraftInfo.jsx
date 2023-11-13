import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './AircraftInfo.module.css'
import { aircrafts } from '../../data/aircrafts'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import Modal from '../../components/Modal/Modal'
import { useModalContext } from '../../context/ModalContext'
import { useAircraftPurchase } from '../../hooks/useAircraftPurchase'
import { useFormatNumber } from '../../hooks/useFormatNumber'
import { useAircraftContext } from '../../context/AircraftContext'

export default function AircraftInfo(){
    const { id } = useParams()
    const {display, setDisplay} = useModalContext()
    const { handleAddAircraftToBuy } = useAircraftPurchase()
    const { formatToMoney } = useFormatNumber()
    const { scrollTop } = useAircraftContext()

    useEffect(() => {
        scrollTop()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {aircrafts && aircrafts.filter(aircraft => aircraft.id === parseInt(id)).map(aircraft => (
                <div key={aircraft.id}>
                    <Modal display={display} setDisplay={setDisplay} />
                    <div className={styles.container}>
                        <div className={styles.details}>
                            <div className={styles.image}>
                                <img src={aircraft.imgSrc} alt={aircraft.name} />
                            </div>
                            <div className={styles.info}>
                                <h1>{aircraft.name}</h1>
                                <ul>
                                    <li>Comprimento: <b>{aircraft.specs.length}</b></li>
                                    <li>Envergadura: <b>{aircraft.specs.wingspan}</b></li>
                                    <li>Altura: <b>{aircraft.specs.height}</b></li>
                                    <li>Capacidade de combustível: <b>{aircraft.specs.fuelCapacity}</b></li>
                                    <li>Autonomia: <b>{aircraft.specs.range}</b></li>
                                    <li>Peso máximo de decolagem: <b>{aircraft.specs.maxTakeoffWeight}</b></li>
                                    <li>Velocidade máxima: <b>{aircraft.specs.maxSpeed}</b></li>
                                    <li>Qtd. máxima de passageiros: <b>{aircraft.specs.passengersQty}</b></li>
                                </ul>
                                <h2>R${formatToMoney(aircraft.price)}</h2>
                                <div className={styles.payment_message}>*** á vista</div>
                                <ClassicButton text="Comprar" onClick={() => handleAddAircraftToBuy(aircraft)} />
                            </div>
                        </div>
                        <div className={styles.description}>
                            <h3>Descrição</h3>
                            <h4>{aircraft.description.title}</h4>
                            <p>{aircraft.description.introduction}</p>
                            <ul>
                                <div>
                                    <li>{aircraft.description.point1}</li>
                                    <p>{aircraft.description.argPoint1}</p>
                                </div>
                                <div>
                                    <li>{aircraft.description.point2}</li>
                                    <p>{aircraft.description.argPoint2}</p>
                                </div>
                                <div>
                                    <li>{aircraft.description.point3}</li>
                                    <p>{aircraft.description.argPoint3}</p>
                                </div>
                                <div>
                                    <li>{aircraft.description.point4}</li>
                                    <p>{aircraft.description.argPoint4}</p>
                                </div>
                                <div>
                                    <li>{aircraft.description.point5}</li>
                                    <p>{aircraft.description.argPoint5}</p>
                                </div>
                                <div>
                                    <li>{aircraft.description.point6}</li>
                                    <p>{aircraft.description.argPoint6}</p>
                                </div>
                            </ul>
                            <p>{aircraft.description.endText1}</p>
                            <p>{aircraft.description.endText2}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}