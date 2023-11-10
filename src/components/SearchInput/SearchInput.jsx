import { BsSearch } from 'react-icons/bs'
import styles from './SearchInput.module.css'
import { useNavigate } from 'react-router-dom'

export default function SearchInput({search, setSearch}){
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        search && navigate(`/search?q=${search}`)
    }

    return(
        <form onSubmit={handleSubmit} className={styles.search}>
            <input type="text" placeholder="Buscar uma aeronave" value={search} onChange={e => setSearch(e.target.value)} />
            <button type="submit">
                <BsSearch />
            </button>
        </form>
    )
}