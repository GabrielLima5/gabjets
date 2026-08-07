import styles from './Search.module.css'
import { useSearchParams } from 'react-router-dom'
import AircraftCard from '../../components/AircraftCard/AircraftCard'
import { useCapitalizeString } from '../../hooks/useCapitalizeString'
import SearchInput from '../../components/SearchInput/SearchInput'
import Reveal from '../../components/Reveal/Reveal'
import { AircraftGridSkeleton } from '../../components/Skeleton/Skeleton'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

export default function Search(){
    const [search, setSearch] = useState('')
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')
    const { capitalizeString } = useCapitalizeString()
    const { aircrafts, loading, error } = useFetch(query)

    return(
        <div className={styles.searchFleet}>
            <Reveal as="h1" className={styles.title}>Resultados para: {capitalizeString(query)}</Reveal>
            <Reveal delay={0.08}>
                <SearchInput search={search} setSearch={setSearch} />
            </Reveal>
            <div className={styles.container}>
                {loading && <AircraftGridSkeleton />}
                {error && <p className="error">{error}</p>}
                {!loading && !error && !aircrafts.length && (
                    <p className={styles.empty}>Nenhuma aeronave encontrada.</p>
                )}
                {aircrafts.map((aircraft, index) => (
                    <Reveal key={aircraft.id} delay={Math.min(index, 6) * 0.06}>
                        <AircraftCard aircraft={aircraft} />
                    </Reveal>
                ))}
            </div>
        </div>
    )
}
