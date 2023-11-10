import styles from './CleanButton.module.css'

export default function CleanButton({onClick, text, bgColor, textColor, hide}){
    return(
        <button 
            className={hide ? 'hide' : styles.btn} 
            style={{backgroundColor: `${bgColor}` || '', color: `${textColor}` || ''}}
            onClick={onClick}
        >
            {text}
        </button>
    )
}