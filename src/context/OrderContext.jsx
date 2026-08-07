import { createContext, useContext, useState } from "react";

export const OrderContext = createContext({})

export const OrderProvider = ({children}) => {
    const [name, setName] = useState('')
    const [airport, setAirport] = useState('')
    const [totalPrice, setTotalPrice] = useState(null)
    const [showConfirmation, setShowConfirmation] = useState(false)

    return(
        <OrderContext.Provider value={{name, setName, airport, setAirport, showConfirmation, setShowConfirmation, totalPrice, setTotalPrice}}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => {
    return useContext(OrderContext)
}
