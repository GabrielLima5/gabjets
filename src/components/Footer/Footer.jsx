import styles from './Footer.module.css'

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <span>&copy; 2023 - GabJets</span>
            <span>Todos os direitos reservados.</span>
        </footer>
    )
}