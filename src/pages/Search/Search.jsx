import styles from './Search.module.css'
import { useSearchParams } from 'react-router-dom'
import { aircrafts } from '../../data/aircrafts'
import AircraftCard from '../../components/AircraftCard/AircraftCard'
import { useCapitalizeString } from '../../hooks/useCapitalizeString'
import SearchInput from '../../components/SearchInput/SearchInput'
import { useEffect, useState } from 'react'
import { useAircraftContext } from '../../context/AircraftContext'

export default function Search(){
    const [search, setSearch] = useState('')
    const [searchParams] = useSearchParams()
    const { scrollTop } = useAircraftContext()
    const query = searchParams.get('q')
    const { capitalizeString } = useCapitalizeString()
    const filteredAircrafts = aircrafts.filter(aircraft => aircraft.name.toLowerCase().includes(query.toLowerCase()))

    useEffect(() => {
        scrollTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className={styles.search_fleet}>
            <h1>Resultados para: {capitalizeString(query)}</h1>
            <SearchInput search={search} setSearch={setSearch} />
            <div className={styles.container}>
                {filteredAircrafts && filteredAircrafts.map(aircraft => (
                    <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))}
            </div>
        </div>
    )
}