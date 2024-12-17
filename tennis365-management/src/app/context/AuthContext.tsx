'use client'

import { createContext, useContext, useState } from "react";

interface AuthContextProps{
    isAuthenticated: boolean;
    validateAuth: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

     const validateAuth = async () => {
        const response = await fetch('/api/validate')
        const results = await response.json();
    
        if(results.authenticated){
          setIsAuthenticated(results.authenticated);
        }
    
    }

    return <AuthContext.Provider value={{isAuthenticated,validateAuth}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('Cannot find AuthProvider');
    return context;
}