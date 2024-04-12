import React from "react"

export const EcommerceContext = React.createContext()

export const EcommerceContextProvider = (props) => {
    
    return (
        <EcommerceContext.Provider value={{
            a: "b"
        }}>
            {props.children}
        </EcommerceContext.Provider>
    )
}