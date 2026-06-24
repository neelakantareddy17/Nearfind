import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeDeliveryOrders(
  callback: (orders: any[]) => void
) {
  return onSnapshot(
    collection(db, "orders"),
    (snapshot) => {
      const orders = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (order: any) =>
            order.status === "READY_FOR_PICKUP" ||
            order.status === "PICKED_UP"
        );

      callback(orders);
    }
  );
}