import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBxfgvFSYdrZ0zR595qgJu7r1zjHyez--Y",
  authDomain: "spread-349216.firebaseapp.com",
  projectId: "spread-349216",
  storageBucket: "spread-349216.appspot.com",
  messagingSenderId: "954890227561",
  appId: "1:954890227561:web:b2e50f32d95149cd87f7f8",
  measurementId: "G-S77MRMWDS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default {
  app,
  db
};