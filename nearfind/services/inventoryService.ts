import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeInventory(
  callback: (items: any[]) => void
) {
  return onSnapshot(
    collection(db, "inventory"),
    (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(items);
    }
  );
}