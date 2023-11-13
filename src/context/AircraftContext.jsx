import { createContext, useContext, useState } from "react";

export const AircraftContext = createContext()

export const AircraftProvider = ({children}) => {
    const [aircraftToBuy, setAircraftToBuy] = useState([])
    
    const scrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
    }

    return(
        <AircraftContext.Provider value={{aircraftToBuy, setAircraftToBuy, scrollTop}}>
            {children}
        </AircraftContext.Provider>
    )
}

export const useAircraftContext = () => {
    return useContext(AircraftContext)
}