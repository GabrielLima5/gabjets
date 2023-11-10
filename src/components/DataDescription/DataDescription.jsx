import styles from './DataDescription.module.css'

export default function DataDescription({column, data, value, type}){
    return(
        <div className={styles.data_container} style={{flexDirection: column ? 'column' : 'row'}}>
            <span className={styles.data} style={{textAlign: (type ? 'center' : 'left')}}>{data}:</span>
            <span className={styles.value && (type && styles.type)}>{value}</span>
        </div>
    )
}