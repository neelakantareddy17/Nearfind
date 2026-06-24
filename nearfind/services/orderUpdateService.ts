import {
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  const orderRef = doc(
    db,
    "orders",
    orderId
  );

  const orderSnap =
    await getDoc(orderRef);

  if (!orderSnap.exists()) {
    return;
  }

  const order =
    orderSnap.data();

  if (
    status === "REJECTED" ||
    status === "CANCELLED"
  ) {
    const inventoryRef = doc(
      db,
      "inventory",
      order.productId
    );

    await updateDoc(
      inventoryRef,
      {
        stock: increment(1),
      }
    );
  }

  await updateDoc(
    orderRef,
    {
      status,
    }
  );
}