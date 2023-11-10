import { createContext, useContext, useState } from "react";

export const AircraftContext = createContext()

export const AircraftProvider = ({children}) => {
    const [aircraftToBuy, setAircraftToBuy] = useState([])

    return(
        <AircraftContext.Provider value={{aircraftToBuy, setAircraftToBuy}}>
            {children}
        </AircraftContext.Provider>
    )
}

export const useAircraftContext = () => {
    return useContext(AircraftContext)
}