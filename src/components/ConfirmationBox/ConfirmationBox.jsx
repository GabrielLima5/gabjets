import styles from './ConfirmationBox.module.css'

export default function ConfirmationBox(){
    return(
        <div className={styles.container}>
            <div className={styles.fade}></div>
            <div className={styles.box}>
                <h1>Pedido concluído</h1>
                <p>Muito obrigado por escolher a GabJets! Aqui vão alguns detalhes do pedido ;)</p>
                <div></div>
            </div>
        </div>
    )
}