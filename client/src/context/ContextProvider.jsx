import { createContext } from "react";
import React from 'react';
export const userContext = createContext()

const ContextPrpvider = ({ children }) => {
    const role = 'admin';
    const authenticated = true
    return (
        <userContext.Provider value={{ role, authenticated }}>
            {children}
        </userContext.Provider>
    )

}
export default ContextPrpvider;