import styles from './Form.module.css'
import ClassicButton from '../../components/ClassicButton/ClassicButton'
import Input from '../Input/Input'

export default function Form({name, setName, email, setEmail, type, setType, message, setMessage, handleSubmit, error}){
    return(
        <div className={styles.form_container}>
            <h1>Formulário de Contato</h1>
            <p>Dúvidas? Sugestões? Reclamações? Não importa o motivo, estamos sempre aqui para te atender!</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input name="Nome" type="text" placeholder="Nome" value={name} setValue={setName} />
                <Input name="Email" type="email" placeholder="Email" value={email} setValue={setEmail} />
                <label>
                    <span>Tipo da mensagem</span>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="Dúvida">Dúvida</option>
                        <option value="Reclamação">Reclamação</option>
                        <option value="Sugestão">Sugestão</option>
                        <option value="Cancelamento">Cancelamento</option>
                    </select>
                </label>
                <label>
                    <span>Mensagem</span>
                    <textarea className={styles.textarea} resize="none" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                </label>
                <span className='error'>{error}</span>
                <span className={error ? 'hide' : ''}>* Todos os campos são obrigatórios.</span>
                <div className={styles.btn}>
                    <ClassicButton text="Enviar" />
                </div>
            </form>
        </div>
    )
}