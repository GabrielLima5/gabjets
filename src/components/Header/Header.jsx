import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/logo-bg.png'
import Navbar from '../Navbar/Navbar'
import styles from './Header.module.css'

export default function Header(){
    return(
        <header className={styles.header}>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <Navbar />
        </header>
    )
}