import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>GabJets</span>
      <span>&copy; {new Date().getFullYear()} Todos os direitos reservados.</span>
    </footer>
  );
}
