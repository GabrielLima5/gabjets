import { createContext, useContext, useState } from "react";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [display, setDisplay] = useState(false)

    return(
        <ModalContext.Provider value={{display, setDisplay}}>
            {children}
        </ModalContext.Provider>
    )
    
}

export const useModalContext = () => {
    return useContext(ModalContext)
}