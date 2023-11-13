import styles from './Fleet.module.css'
import { useParams } from "react-router-dom"
import { aircrafts } from '../../data/aircrafts'
import AircraftCard from "../../components/AircraftCard/AircraftCard"
import SearchInput from '../../components/SearchInput/SearchInput'
import { useState, useEffect } from 'react'
import { useCapitalizeString } from '../../hooks/useCapitalizeString'
import { useAircraftContext } from '../../context/AircraftContext'

export default function Fleet(){
    const { company } = useParams()
    const [search, setSearch] = useState('')
    const { capitalizeString } = useCapitalizeString()
    const { scrollTop } = useAircraftContext()
    
    useEffect(() => {
        scrollTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className={styles.fleet}>
            <h1>Catálogo de Aeronaves {company ? capitalizeString(company) : ''}</h1>
            <SearchInput search={search} setSearch={setSearch} />
            <div className={styles.container}>
                {aircrafts && company ? (
                    aircrafts.sort((a, b) => a.price.length - b.price.length).sort((a, b) => a.price - b.price).filter(aircraft => aircraft.company === company).map(aircraft => (
                        <AircraftCard key={aircraft.id} aircraft={aircraft} />
                    ))
                ) : (aircrafts.sort((a, b) => a.price.length - b.price.length).sort((a, b) => a.price - b.price).map(aircraft => (
                        <AircraftCard key={aircraft.id} aircraft={aircraft} />
                    )))
                }
            </div>
        </div>
    )
}