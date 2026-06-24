import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function createOrder(item: any) {
  const inventoryRef = doc(
    db,
    "inventory",
    item.id
  );

  await runTransaction(db, async (transaction) => {
    const inventoryDoc =
      await transaction.get(inventoryRef);

    if (!inventoryDoc.exists()) {
      throw new Error("Product not found");
    }

    const currentStock =
      inventoryDoc.data().stock ?? 0;

    if (currentStock <= 0) {
      throw new Error("Out of stock");
    }

    transaction.update(inventoryRef, {
      stock: currentStock - 1,
    });

    const orderRef = doc(
      collection(db, "orders")
    );

    transaction.set(orderRef, {
      productId: item.productId,
      productName: item.productName,

      retailerId: item.retailerId,
      retailerName: item.retailerName,

      customerId: "customer_1",
      customerName: "Demo Customer",

      quantity: 1,

      status: "PLACED",

      createdAt: serverTimestamp(),
    });
  });
}