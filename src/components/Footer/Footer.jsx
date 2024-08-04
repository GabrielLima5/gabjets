import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>&copy; {new Date().getFullYear()} - GabJets</span>
      <span>Todos os direitos reservados.</span>
    </footer>
  );
}
