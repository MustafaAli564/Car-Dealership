// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-dealership-d31c4.firebaseapp.com",
  projectId: "car-dealership-d31c4",
  storageBucket: "car-dealership-d31c4.appspot.com",
  messagingSenderId: "632987070788",
  appId: "1:632987070788:web:ea6565b522876af0e3e711"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);