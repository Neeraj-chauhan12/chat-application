
import React, { createContext, useContext,  useState } from 'react';
import Cookies from 'js-cookie';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const initialAuthState =localStorage.getItem("data")

    const [auth, setAuth] = useState(initialAuthState ? JSON.parse(initialAuthState) : null);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
