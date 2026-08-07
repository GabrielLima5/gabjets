import { useAircraftContext } from '../context/AircraftContext';
import { useModalContext } from '../context/ModalContext';

const MAX_AIRCRAFTS_PER_ORDER = 3

export const useAircraftPurchase = () => {
    const { setAircraftToBuy } = useAircraftContext()
    const { setDisplay } = useModalContext()

    const handleAddAircraftToBuy = (aircraft) => {
        setDisplay(true)

        setAircraftToBuy((current) => {
            const alreadyAdded = current.some(item => item.id === aircraft.id)
            if (alreadyAdded || current.length >= MAX_AIRCRAFTS_PER_ORDER) return current
            return [...current, aircraft]
        })
    }

    const handleDeleteAircraft = (aircraft) => {
        setAircraftToBuy((current) => current.filter(item => item.id !== aircraft.id))
    }

    return { handleAddAircraftToBuy, handleDeleteAircraft }
}
