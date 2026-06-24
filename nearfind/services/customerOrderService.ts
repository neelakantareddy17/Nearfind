import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export function subscribeCustomerOrders(
  callback: (orders: any[]) => void
) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(db, "orders"),
    where("customerId", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(orders);
  });
}