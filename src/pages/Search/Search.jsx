import styles from './Search.module.css'
import { useSearchParams } from 'react-router-dom'
import AircraftCard from '../../components/AircraftCard/AircraftCard'
import { useCapitalizeString } from '../../hooks/useCapitalizeString'
import SearchInput from '../../components/SearchInput/SearchInput'
import { useEffect, useState } from 'react'
import { useAircraftContext } from '../../context/AircraftContext'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../components/Loader/Loader'

export default function Search(){
    const [search, setSearch] = useState('')
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')
    const { capitalizeString } = useCapitalizeString()
    const { aircrafts, loading, error } = useFetch(`http://planes-api.vercel.app/aircrafts?q=${query}`)
    const { scrollTop } = useAircraftContext()

    useEffect(() => {
        scrollTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className={styles.search_fleet}>
            <h1>Resultados para: {capitalizeString(query)}</h1>
            <SearchInput search={search} setSearch={setSearch} />
            <div className={styles.container}>
                {loading && <Loader />}
                {error && <p>{error}</p>}
                {aircrafts?.map(aircraft => (
                    <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))}
            </div>
        </div>
    )
}