import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyA5mI9aUvI66VcVbsvMfxIOsmlYJRCCwEU",
    authDomain: "summative-36916.firebaseapp.com",
    projectId: "summative-36916",
    storageBucket: "summative-36916.firebasestorage.app",
    messagingSenderId: "134684568418",
    appId: "1:134684568418:web:4b102baad03af054b49a3b"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };