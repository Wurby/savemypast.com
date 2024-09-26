// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "savemypast-412606.firebaseapp.com",
  projectId: "savemypast-412606",
  storageBucket: "savemypast-412606.appspot.com",
  messagingSenderId: "671121787471",
  appId: "1:671121787471:web:9aa658df67befd23d9383a",
  measurementId: "G-BW5X6CD4MY",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, analytics, auth };
