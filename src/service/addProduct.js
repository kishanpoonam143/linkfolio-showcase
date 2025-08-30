import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

async function addProduct(product) {
  await addDoc(collection(db, "product"), product);
}