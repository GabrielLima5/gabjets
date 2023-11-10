import styles from './Loader.module.css'

export default function Loader({text}){
    return(
        <div className={styles.container}>
            <span className={styles.loader}></span>
            <span className={styles.textbox}>{text}
                <span className={styles.dots}>...</span>
            </span>
        </div>
    )
}