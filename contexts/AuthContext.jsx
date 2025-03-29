import { createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const authMethods = useAuth();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
            setUser(firebaseUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async() => {
        await signOut(auth);
        setUser(null);
    }
    return(
        <AuthContext.Provider
        value={{
            user,
            authLoading,
            logout,
            ...authMethods, // login, register, resetPassword, etc.
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);