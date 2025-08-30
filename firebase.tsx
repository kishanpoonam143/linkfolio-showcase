import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_h6hx-nTrSk1uY2ZLQS4s50wF4RNDXXo",
  authDomain: "affiliatehub-21ec0.firebaseapp.com",
  projectId: "affiliatehub-21ec0",
  storageBucket: "affiliatehub-21ec0.firebasestorage.app",
  messagingSenderId: "328288425393",
  appId: "1:328288425393:web:6185324f514441ed0d5990",
  measurementId: "G-P64GGFP3PM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
