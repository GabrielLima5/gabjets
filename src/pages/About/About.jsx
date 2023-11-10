import styles from './About.module.css'
import AboutUsPhoto from '../../assets/About/about-us.jpg'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import { Link } from 'react-router-dom'

export default function About(){
    return(
        <div className={styles.about}>
            <h1>GabJets: Elevando Voos e Negócios</h1>
            <div className={styles.container}>
                <div className={styles.text}>
                    <div>
                        <p>Na GabJets, nossa paixão é <b>proporcionar experiências aéreas de alto nível e impulsionar o sucesso dos negócios</b>. Há mais de uma década, temos sido a escolha preferida de líderes e visionários que buscam o que há de melhor em aeronaves executivas e comerciais. Somos uma empresa que vai além de simplesmente vender aeronaves; nós realizamos sonhos, otimizamos viagens e transformamos negócios.</p>
                        <p>Nossa história é marcada por um compromisso inabalável com a excelência. Desde a nossa fundação, acumulamos uma vasta experiência e conhecimento no setor de aviação. Cada aeronave que oferecemos é selecionada criteriosamente, representando o que há de mais moderno em design, tecnologia e desempenho. Trabalhamos com as principais fabricantes do mundo para garantir que nossos clientes tenham acesso às melhores aeronaves do mercado.</p>
                        <p>Entendemos que o tempo é um recurso precioso. Nossas aeronaves executivas oferecem agilidade e flexibilidade, permitindo que você chegue mais longe e com rapidez, tornando reuniões e negócios globais mais eficientes. </p>
                        <p>Nossa equipe dedicada está à disposição para atender às suas necessidades específicas, desde a seleção da aeronave até a manutenção e suporte contínuo.</p>
                    </div>
                    <div className={styles.buttons}>
                        <Link to="/buy">
                            <ClassicButton text="Compre uma aeronave" />
                        </Link>
                        <Link to="/contact">
                            <ClassicButton text="Entre em contato" />
                        </Link>
                    </div>
                </div>
                <div className={styles.image}>
                    <img src={AboutUsPhoto} alt="About Us" />
                </div>
            </div>
        </div>
    )
}