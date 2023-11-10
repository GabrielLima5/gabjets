import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { useModalContext } from '../../context/ModalContext'
import { useAircraftContext } from '../../context/AircraftContext'

export default function Navbar(){
    const {aircraftToBuy} = useAircraftContext()
    const {display, setDisplay} = useModalContext()

    return(
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/fleet">Frota</Link>
                </li>
                <li>
                    <Link to="/buy">Comprar</Link>
                </li>
                <li>
                    <Link to="/about">Sobre Nós</Link>
                </li>
                <li>
                    <Link to="/contact">Contato</Link>
                </li>
                <li className={styles.cart}>
                    <BsFillCartFill onClick={() => setDisplay(true)} />
                    <div className={styles.cart_badge}>{aircraftToBuy.length}</div>
                </li>
            </ul>
        </nav>
    )
}