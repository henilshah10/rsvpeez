import { createContext, useState, useEffect, useContext } from "react";

import { db } from "../firebase";
import { addDoc, collection, doc, setDoc, onSnapshot } from "firebase/firestore";

import AuthContext from "./AuthContext";

const DbContext = createContext();

export function DbProvider({ children }) {
    const { user } = useContext(AuthContext);

    const [currentUserOnDb, setCurrentUserOnDb] = useState({});

    useEffect(() => {
        if (user !== null) {
            getUserInfo();
        }
    }, [user]);

    const getUserInfo = () => {
        const result = onSnapshot(doc(db, "Users", user.uid), (doc) => {
            setCurrentUserOnDb(doc.data());
        });
    };

    const submitQuery = async (queryObject) => {
        try {
            await addDoc(collection(db, "Queries"), queryObject);
        } catch (e) {
            console.log("Error Occurred in saving to db: " + e);
        }
    };

    const value = { currentUserOnDb, submitQuery };

    return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}

export default DbContext;
