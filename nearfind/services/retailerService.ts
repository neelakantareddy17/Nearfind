import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeRetailerOrders(
  callback: (orders: any[]) => void
) {
  return onSnapshot(
    collection(db, "orders"),
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(orders);
    }
  );
}