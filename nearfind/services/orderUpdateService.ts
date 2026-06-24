import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  await updateDoc(doc(db, "orders", orderId), {
    status,
  });
}