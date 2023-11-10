import { useState } from 'react'
import Loader from '../../components/Loader/Loader'
import Form from '../../components/Form/Form'
import SentMessage from '../../components/SentFormMessage/SentFormMessage'

export default function Contact(){
    const [form, setForm] = useState(true)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('Dúvida')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !email || !type || !message){
            setError('* Campos obrigatórios não preenchidos.')
            return
        }
        setLoading(true)
        setForm(false)

        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }

    if (loading){
        return <Loader text="Carregando" />
    }

    return(form ? (
        <Form
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            type={type}
            setType={setType}
            message={message}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
            error={error}
        />
    ) : (
       <SentMessage
            name={name}
            email={email}
            type={type}
            message={message}
       />
    ))
}