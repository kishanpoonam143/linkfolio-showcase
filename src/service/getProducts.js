import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

async function fetchProducts() {
  const snapshot = await getDocs(collection(db, "product"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}