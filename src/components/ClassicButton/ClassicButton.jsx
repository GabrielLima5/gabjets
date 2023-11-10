import styles from './ClassicButton.module.css'

export default function Button({onClick, color, text, fontSize, hide}){
    return(
        <button onClick={onClick} className={styles.btn} style={{backgroundColor: color || '', fontSize: `${fontSize}rem` || ''}} href="/">
            <span className={hide ? 'hide': styles.btnspan}>{text}</span>
        </button>
    )
}