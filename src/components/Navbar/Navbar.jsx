import styles from './Navbar.module.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { useModalContext } from '../../context/ModalContext'
import { useAircraftContext } from '../../context/AircraftContext'
import { BsXLg } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function Navbar(){
    const {aircraftToBuy} = useAircraftContext()
    const {display, setDisplay} = useModalContext()
    const headerRef = useRef()

    const toggleHeaderModal = () => {
        headerRef.current.classList.toggle('open')
    }

    return(
        <nav className={styles.navbar}>
            <div className={styles.responsive_cart}>
                <BsFillCartFill onClick={() => setDisplay(true)} />
                <div className={styles.cart_badge}>{aircraftToBuy.length}</div>
            </div>
            <div className={styles.open_header_modal} onClick={toggleHeaderModal}>
                <RxHamburgerMenu />
            </div>
            <ul ref={headerRef}>
                <li className={styles.close_header_modal} onClick={toggleHeaderModal}>
                    <BsXLg />
                </li>
                <li onClick={toggleHeaderModal}>
                    <Link to="/">Home</Link>
                </li>
                <li onClick={toggleHeaderModal}>
                    <Link to="/fleet">Frota</Link>
                </li>
                <li onClick={toggleHeaderModal}>
                    <Link to="/buy">Comprar</Link>
                </li>
                <li onClick={toggleHeaderModal}>
                    <Link to="/about">Sobre Nós</Link>
                </li>
                <li onClick={toggleHeaderModal}>
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