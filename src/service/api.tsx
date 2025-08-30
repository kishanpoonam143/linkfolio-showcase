import { collection, addDoc, getDocs ,doc, updateDoc,deleteDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { Product } from "@/types/Product";

// Add product to Firestore
export const addProductApi = async (product) => {
  try {
    console.log(product);
    await addDoc(collection(db, "product"), product);
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

// Fetch products from Firestore
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(collection(db, "product"));
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Product, "id">; // Cast for TypeScript
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};
export const updateProductApi = async (id: string, updatedData: Partial<Omit<Product, "id">>) => {
  try {
    const productRef = doc(db, "product", id);
    await updateDoc(productRef, updatedData);
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};
export const deleteProductApi = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, "product", id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
};
