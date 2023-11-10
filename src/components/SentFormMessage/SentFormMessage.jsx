import styles from './SentFormMessage.module.css'
import DataDescription from '../DataDescription/DataDescription'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import { Link } from 'react-router-dom'
import { useRandomNumber } from '../../hooks/useRandomNumber'

export default function SentFormMessage({name, email, type, message}){
    const { getRandomInt } = useRandomNumber()
    const id = getRandomInt(100000000, 10000000000)

    return(
        <div className={styles.message_container}>
            <h1>Mensagem enviada com sucesso!</h1>
            <p>Sua mensagem acaba de ser enviada em nossa central. Nossa resposta será enviada em até 3 dias.</p>
            <p style={{alignSelf: 'flex-start'}}>Dados da mensagem enviada:</p>
            <div className={styles.message_info}>
                <div className={styles.data}>
                    <DataDescription data='Nome' value={name} />
                    <DataDescription data='Email' value={email} />
                    <DataDescription data='Mensagem' value={message} column={true} />
                </div>
                <div className={styles.type}>
                    <DataDescription data='Tipo' value={type} column={true} type={true} />
                    <DataDescription data='Protocolo' value={id} column={true} type={true} />
                </div>
            </div>
            <Link to="/">
                <ClassicButton text="Voltar para a página inicial" />
            </Link>
        </div>
    )
}