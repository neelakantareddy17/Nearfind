import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function updateStock(
  productId: string,
  amount: number
) {
  await updateDoc(
    doc(db, "inventory", productId),
    {
      stock: increment(amount),
    }
  );
}