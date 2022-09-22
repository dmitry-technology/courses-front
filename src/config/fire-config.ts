// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZSdbiHoWB0OyNGCyrRmaFs7otMrs_qlk",
  authDomain: "course-8ee4e.firebaseapp.com",
  projectId: "course-8ee4e",
  storageBucket: "course-8ee4e.appspot.com",
  messagingSenderId: "121327994518",
  appId: "1:121327994518:web:fb3e481e4100949e50a4b7",
  measurementId: "G-YS03KES1XQ"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
export default appFire;