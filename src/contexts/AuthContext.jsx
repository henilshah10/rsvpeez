import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsub();
        };
    }, []);

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return 200;
        } catch (error) {
            console.log(error);
            return 500;
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            return 200;
        } catch (error) {
            console.log(error);
            return 500;
        }
    };

    const value = {
        user,
        googleLogin,
        logOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
