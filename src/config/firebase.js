// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
import {
    getFirestore
} from "firebase/firestore/lite";
import {
    getAuth
} from "firebase/auth";
import {
    getStorage
} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfCdi0vNfsFVBhPH1qddBSd4uzxwpugQU",
    authDomain: "lms-hackathon.firebaseapp.com",
    projectId: "lms-hackathon",
    storageBucket: "lms-hackathon.appspot.com",
    messagingSenderId: "277172770543",
    appId: "1:277172770543:web:1f202e5d8c5af7906bed1a",
    measurementId: "G-4603VN7M5C"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);