// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf47qS_oQOewo4ApUsqIE5x9djv6nvJwA",
  authDomain: "courses-5d096.firebaseapp.com",
  projectId: "courses-5d096",
  storageBucket: "courses-5d096.appspot.com",
  messagingSenderId: "99644267725",
  appId: "1:99644267725:web:e601fbc38fba019b665d84"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
export default appFire;