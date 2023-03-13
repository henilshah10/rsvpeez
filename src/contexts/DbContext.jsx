import { createContext, useState, useEffect, useContext } from "react";

import { db } from "../firebase";
import { addDoc, collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

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
        onSnapshot(doc(db, "Users", user.uid), (doc) => {
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

    const createNewEventOnDb = async (eventObject) => {
        try {
            // updating total events created by current firebase user
            const userRef = doc(db, "Users", user.uid);
            await updateDoc(userRef, {
                eventsCreated: parseInt(currentUserOnDb.eventsCreated + 1),
            });

            // writing the new event on db
            eventObject.uid = user.uid;
            await addDoc(collection(db, "Events"), eventObject);

            return 200;
        } catch (e) {
            console.log("Error Occurred in saving to db: " + e);
            return 500;
        }
    };

    const value = { currentUserOnDb, submitQuery, createNewEventOnDb };

    return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}

export default DbContext;
