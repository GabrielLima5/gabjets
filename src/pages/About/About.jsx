import styles from './About.module.css'
import AboutUsPhoto from '../../assets/About/about-us.jpg'
import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal/Reveal'
import { Link } from 'react-router-dom'

const STATS = [
    { value: '12+', label: 'anos de experiência' },
    { value: '3', label: 'fabricantes parceiras' },
    { value: '500+', label: 'voos facilitados' },
    { value: '24/7', label: 'suporte dedicado' },
]

export default function About(){
    return(
        <div className={styles.about}>
            <Reveal as="span" className={styles.eyebrow}>Sobre a GabJets</Reveal>
            <Reveal as="h1" delay={0.05} className={styles.title}>Elevamos voos. Transformamos negócios.</Reveal>

            <div className={styles.container}>
                <Reveal className={styles.text} delay={0.1} distance={20}>
                    <p className={styles.lead}>Há mais de uma década conectamos líderes e visionários às aeronaves executivas e comerciais mais avançadas do mercado — com curadoria, tecnologia e um único propósito: fazer a distância deixar de ser um problema.</p>
                    <p>Na GabJets, acreditamos que tempo é o ativo mais valioso de quem lidera. Por isso, cada aeronave do nosso catálogo passa por uma curadoria rigorosa — selecionamos apenas o que representa o estado da arte em design, tecnologia e desempenho, direto das principais fabricantes do mundo: Embraer, Airbus e Boeing.</p>
                    <p>Não vendemos apenas aviões. Projetamos experiências. Da primeira busca no catálogo até a retirada da aeronave, cada etapa foi pensada para ser rápida, transparente e memorável — sem burocracia, sem fricção.</p>
                    <p>Seja para encurtar reuniões entre continentes ou redefinir o que significa viajar com liberdade, a GabJets existe para colocar você mais perto de onde precisa estar.</p>
                    <div className={styles.buttons}>
                        <Link to="/buy">
                            <Button>Compre uma aeronave</Button>
                        </Link>
                    </div>
                </Reveal>
                <Reveal className={styles.image} delay={0.25} distance={20}>
                    <img src={AboutUsPhoto} alt="Executivo observando a paisagem durante o voo" />
                </Reveal>
            </div>

            <div className={styles.stats}>
                {STATS.map((stat, index) => (
                    <Reveal key={stat.label} delay={index * 0.08} distance={16} className={styles.stat}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </Reveal>
                ))}
            </div>
        </div>
    )
}
