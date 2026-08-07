import styles from './Navbar.module.css'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { BsFillCartFill, BsXLg } from 'react-icons/bs'
import { useModalContext } from '../../context/ModalContext'
import { useAircraftContext } from '../../context/AircraftContext'
import { RxHamburgerMenu } from 'react-icons/rx'

const LINKS = [
    { to: '/', label: 'Home' },
    { to: '/fleet', label: 'Frota' },
    { to: '/buy', label: 'Comprar' },
    { to: '/about', label: 'Sobre Nós' },
]

const navLinkClassName = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link

export default function Navbar(){
    const {aircraftToBuy} = useAircraftContext()
    const {setDisplay} = useModalContext()
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return(
        <nav className={styles.navbar}>
            <div className={styles.responsiveCart}>
                <BsFillCartFill onClick={() => setDisplay(true)} />
                {aircraftToBuy.length > 0 && <span className={styles.cartBadge}>{aircraftToBuy.length}</span>}
            </div>

            <button type="button" className={styles.menuToggle} onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
                <RxHamburgerMenu />
            </button>

            {/* Desktop nav — hidden entirely on mobile, never occupies off-screen space */}
            <ul className={styles.links}>
                {LINKS.map(({ to, label }) => (
                    <li key={to}>
                        <NavLink to={to} className={navLinkClassName}>{label}</NavLink>
                    </li>
                ))}
                <li className={styles.cart}>
                    <BsFillCartFill onClick={() => setDisplay(true)} />
                    {aircraftToBuy.length > 0 && <span className={styles.cartBadge}>{aircraftToBuy.length}</span>}
                </li>
            </ul>

            {/* Mobile drawer — portaled straight to <body>. The header is a glass
                panel (backdrop-filter), and per spec that makes it the containing
                block for any `position:fixed` descendant instead of the viewport —
                which silently broke this drawer's sizing. Rendering it outside the
                header's subtree sidesteps that entirely. It also only exists in the
                DOM while open, and only its inner panel slides (see Navbar.module.css),
                so it can never be dragged into view from off-screen on mobile. */}
            {createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <div className={styles.mobileMenuClip}>
                            <motion.ul
                                className={styles.mobileMenu}
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <li className={styles.closeMenu} onClick={closeMenu}>
                                    <BsXLg />
                                </li>
                                {LINKS.map(({ to, label }) => (
                                    <li key={to} onClick={closeMenu}>
                                        <NavLink to={to} className={navLinkClassName}>{label}</NavLink>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </nav>
    )
}
