import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { getAdditionalUserInfo } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsub();
        };
    }, []);

    const createNewUserDocument = async (firebaseUser) => {
        try {
            if (firebaseUser !== null) {
                const newUser = {
                    Name: firebaseUser.displayName,
                    Email: firebaseUser.email,
                    EventsCreated: 0,
                };

                await setDoc(doc(db, "Users", firebaseUser.uid), newUser);
            }
        } catch (e) {
            console.log("Error Occurred in saving to db: " + e);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (getAdditionalUserInfo(result).isNewUser) {
                createNewUserDocument(result.user);
            }
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
