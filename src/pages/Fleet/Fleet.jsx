import styles from './Fleet.module.css'
import { useParams } from "react-router-dom"
import AircraftCard from "../../components/AircraftCard/AircraftCard"
import SearchInput from '../../components/SearchInput/SearchInput'
import Loader from '../../components/Loader/Loader'
import { useState, useEffect } from 'react'
import { useCapitalizeString } from '../../hooks/useCapitalizeString'
import { useAircraftContext } from '../../context/AircraftContext'
import { useFetch } from '../../hooks/useFetch'
import { useSortData } from '../../hooks/useSortData'

export default function Fleet(){
    const { aircrafts, loading, error } = useFetch()
    const { sortPrice, sortPriceLength, filterCompany } = useSortData()
    const { company } = useParams()
    const { capitalizeString } = useCapitalizeString()
    const { scrollTop } = useAircraftContext()
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        scrollTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className={styles.fleet}>
            <h1>Catálogo de Aeronaves {company ? capitalizeString(company) : ''}</h1>
            <SearchInput search={search} setSearch={setSearch} />
            <div className={styles.container}>
                {loading && <Loader />}
                {error && <p>{error}</p>}

                {aircrafts && company ? (
                    aircrafts.sort(sortPriceLength).sort(sortPrice).filter(aircraft => filterCompany(aircraft, company)).map(aircraft => (
                        <AircraftCard key={aircraft.id} aircraft={aircraft} />
                    ))
                ) : (aircrafts.sort(sortPriceLength).sort(sortPrice).map(aircraft => (
                        <AircraftCard key={aircraft.id} aircraft={aircraft} />
                    )))
                }
            </div>
        </div>
    )
}