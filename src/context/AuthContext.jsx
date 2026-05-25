import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const user = token ? jwtDecode(token) : null;

    const role =
        user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const isAdmin = role === "Admin";

    const isAuthenticated = !!token;

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                role,
                isAdmin,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}