import styles from './BrandButton.module.css'

export default function BrandButton({handleLogo, logo, dataset}){
    return(
        <button onMouseOver={handleLogo} className={styles.brand} data-airplane={dataset} type="button">
            <img src={logo} alt="Embraer Logo" />
        </button>
    )
}