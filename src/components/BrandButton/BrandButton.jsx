import styles from './BrandButton.module.css'
import { useTilt } from '../../hooks/useTilt'

export default function BrandButton({ logo, name, onSelect }){
    const tiltRef = useTilt({ max: 10, lift: -6 })

    return(
        <button onMouseEnter={onSelect} className={styles.brand} type="button" ref={tiltRef}>
            <img src={logo} alt={`Logo ${name}`} />
        </button>
    )
}
