import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, COLLECTIONS } from "./config";
import type { User, UserRole } from "@/types";

const googleProvider = new GoogleAuthProvider();

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole = "customer"
) {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(credential.user, { displayName });

  const userData: Omit<User, "id"> = {
    email,
    displayName,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(db, COLLECTIONS.USERS, credential.user.uid), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return credential;
}

export async function signInWithGoogle(role: UserRole = "customer") {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const credential = await signInWithPopup(auth, googleProvider);
  const { user } = credential;

  const userRef = doc(db, COLLECTIONS.USERS, user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName ?? "User",
      photoURL: user.photoURL,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return credential;
}

export async function resetPassword(email: string) {
  const auth = getFirebaseAuth();
  return sendPasswordResetEmail(auth, email);
}

export async function logOut() {
  const auth = getFirebaseAuth();
  return signOut(auth);
}

export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const db = getFirebaseDb();
  const userSnap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
  if (!userSnap.exists()) return null;
  return { id: userSnap.id, ...userSnap.data() } as User;
}
