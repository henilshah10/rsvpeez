// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU9jjbPUgC0GGnk9cpLj9fn6nvfCZVp7o",
    authDomain: "rsvpeez-10.firebaseapp.com",
    projectId: "rsvpeez-10",
    storageBucket: "rsvpeez-10.appspot.com",
    messagingSenderId: "708071603697",
    appId: "1:708071603697:web:c72bb4fcec230e01471850",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
