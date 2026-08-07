import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BsChevronDown } from 'react-icons/bs'
import styles from './Select.module.css'

/**
 * Custom-styled dropdown used instead of a native <select>, so the open
 * list can match the app's glass/dark theme instead of the OS's own
 * (unstyleable) native option list.
 */
export default function Select({ label, value, onChange, options, placeholder = 'Selecione' }) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef(null)

    useEffect(() => {
        if (!open) return

        const closeIfOutside = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
        }
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') setOpen(false)
        }

        document.addEventListener('mousedown', closeIfOutside)
        document.addEventListener('keydown', closeOnEscape)
        return () => {
            document.removeEventListener('mousedown', closeIfOutside)
            document.removeEventListener('keydown', closeOnEscape)
        }
    }, [open])

    const handleSelect = (option) => {
        onChange(option)
        setOpen(false)
    }

    return (
        <div className={styles.field} ref={rootRef}>
            {label && <span className={styles.label}>{label}</span>}

            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(current => !current)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={value ? styles.value : styles.placeholder}>
                    {value || placeholder}
                </span>
                <BsChevronDown className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        className={styles.dropdown}
                        role="listbox"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                    >
                        {options.map((option) => (
                            <li
                                key={option}
                                role="option"
                                aria-selected={option === value}
                                className={option === value ? `${styles.option} ${styles.optionSelected}` : styles.option}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
