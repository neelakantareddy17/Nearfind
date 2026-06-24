import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "./firebase";

export async function login(
  email: string,
  password: string
) {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  const uid = credential.user.uid;

  const userDoc = await getDoc(
    doc(db, "users", uid)
  );

  if (!userDoc.exists()) {
    throw new Error("User profile not found");
  }

  const data = userDoc.data();

  return {
    uid,
    email: credential.user.email,
    role: data.role,
    name: data.name,
  };
}

export async function logout() {
  await signOut(auth);
}