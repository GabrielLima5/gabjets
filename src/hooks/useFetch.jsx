import { useEffect, useState } from "react"

const BASE_URL = 'https://planes-api.vercel.app/aircrafts'

export const useFetch = (query) => {
    const [aircrafts, setAircrafts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const url = query ? `${BASE_URL}?q=${encodeURIComponent(query)}` : BASE_URL

    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true)
                const res = await fetch(url)
                const data = await res.json()
                setAircrafts(data)
            } catch (e){
                console.error(e)
                setError('Não foi possível carregar as aeronaves. Tente novamente mais tarde.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { aircrafts, loading, error }
}
