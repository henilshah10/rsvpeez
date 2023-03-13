import { createContext, useState, useEffect, useContext } from "react";

import { db } from "../firebase";
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    onSnapshot,
    setDoc,
    query,
    where,
    getDocs,
    getDoc,
} from "firebase/firestore";

import AuthContext from "./AuthContext";

const DbContext = createContext();

export function DbProvider({ children }) {
    const { user } = useContext(AuthContext);

    const [currentUserOnDb, setCurrentUserOnDb] = useState({});

    const [allEvents, setAllEvents] = useState([]);

    const [currentEventData, setCurrentEventData] = useState({});

    useEffect(() => {
        if (user !== null) {
            getUserInfo();
            getAllEvents();
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
            const eventNumber = parseInt(currentUserOnDb.eventsCreated + 1);

            // updating total events created by current firebase user
            const userRef = doc(db, "Users", user.uid);

            await updateDoc(userRef, {
                eventsCreated: eventNumber,
            });

            // writing the new event on db
            const newEventID = eventNumber.toString() + Math.random().toString(36).slice(-7);

            eventObject.link = "http://localhost:5173/invites" + newEventID;
            eventObject.uid = user.uid;

            await setDoc(doc(db, "Events", newEventID), eventObject);

            return 200;
        } catch (e) {
            console.log("Error Occurred in saving to db: " + e);
            return 500;
        }
    };

    const getAllEvents = async () => {
        const q = query(collection(db, "Events"), where("uid", "==", user.uid));

        let allEventsOnDB = [];

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allEventsOnDB.push(doc.data());
        });

        setAllEvents(allEventsOnDB);
    };

    const getEventData = async (eventID) => {
        try {
            const eventRef = doc(db, "Events", eventID);
            const eventSnap = await getDoc(eventRef);

            if (eventSnap.exists()) {
                setCurrentEventData(eventSnap.data());
                return eventSnap.data();
            } else {
                console.log("No such event!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const value = {
        currentUserOnDb,
        allEvents,
        currentEventData,
        submitQuery,
        createNewEventOnDb,
        getEventData,
        getAllEvents,
        getEventData,
    };

    return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}

export default DbContext;
