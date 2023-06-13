
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCTOTxJxvpPsjPQOC8QmECMsUH8vnWwF5I",
  authDomain: "social-21014.firebaseapp.com",
  projectId: "social-21014",
  storageBucket: "social-21014.appspot.com",
  messagingSenderId: "652568711046",
  appId: "1:652568711046:web:5939f2e0cc3d055f142607",
  measurementId: "G-GBJCXX1HZJ"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore()

export {auth,db}