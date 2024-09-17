
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD1tNrvb5mVLqD2JoIZtSUX0lMF51wT4SQ",
  authDomain: "nomadelife-victoria.firebaseapp.com",
  projectId: "nomadelife-victoria",
  storageBucket: "nomadelife-victoria.appspot.com",
  messagingSenderId: "969385765541",
  appId: "1:969385765541:web:0bc8141b6592af85a5bb4c",
  measurementId: "G-NCSGP51DPT"
}


const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db= getFirestore(app)

export{db}