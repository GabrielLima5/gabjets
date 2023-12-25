import { useEffect, useState } from "react"

const baseUrl = 'https://planes-api.vercel.app/aircrafts'

export const useFetch = (url = baseUrl) => {
    const [aircrafts, setAircrafts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true)
                const res = await fetch(url)
                const data = await res.json()
                setLoading(false)
                setAircrafts(data)
            } catch (e){
                console.error(e)
                setError(e)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { aircrafts, loading, error }
}