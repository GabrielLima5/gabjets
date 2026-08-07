import styles from './Fleet.module.css'
import { useParams } from "react-router-dom"
import AircraftCard from "../../components/AircraftCard/AircraftCard"
import SearchInput from '../../components/SearchInput/SearchInput'
import Reveal from '../../components/Reveal/Reveal'
import { AircraftGridSkeleton } from '../../components/Skeleton/Skeleton'
import { useState } from 'react'
import { useCapitalizeString } from '../../hooks/useCapitalizeString'
import { useFetch } from '../../hooks/useFetch'
import { useSortData } from '../../hooks/useSortData'

export default function Fleet(){
    const { aircrafts, loading, error } = useFetch()
    const { sortByPrice, filterByCompany } = useSortData()
    const { company } = useParams()
    const { capitalizeString } = useCapitalizeString()
    const [search, setSearch] = useState('')

    const sortedAircrafts = [...aircrafts].sort(sortByPrice)
    const visibleAircrafts = company
        ? sortedAircrafts.filter(aircraft => filterByCompany(aircraft, company))
        : sortedAircrafts

    return(
        <div className={styles.fleet}>
            <Reveal as="h1" className={styles.title}>Catálogo de Aeronaves {company ? capitalizeString(company) : ''}</Reveal>
            <Reveal delay={0.08}>
                <SearchInput search={search} setSearch={setSearch} />
            </Reveal>
            <div className={styles.container}>
                {loading && <AircraftGridSkeleton />}
                {error && <p className="error">{error}</p>}

                {!loading && !visibleAircrafts.length && !error && (
                    <p className={styles.empty}>Nenhuma aeronave encontrada.</p>
                )}

                {visibleAircrafts.map((aircraft, index) => (
                    <Reveal key={aircraft.id} delay={Math.min(index, 6) * 0.06}>
                        <AircraftCard aircraft={aircraft} />
                    </Reveal>
                ))}
            </div>
        </div>
    )
}
