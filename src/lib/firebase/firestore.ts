import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  DocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb, COLLECTIONS } from "./config";

export { COLLECTIONS };

export function getCollectionRef(collectionName: string) {
  return collection(getFirebaseDb(), collectionName);
}

export function getDocRef(collectionName: string, id: string) {
  return doc(getFirebaseDb(), collectionName, id);
}

export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const snap = await getDoc(getDocRef(collectionName, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function getDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(getCollectionRef(collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function createDocument<T extends Record<string, unknown>>(
  collectionName: string,
  data: T
) {
  const ref = await addDoc(getCollectionRef(collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: Record<string, unknown>
) {
  await updateDoc(getDocRef(collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collectionName: string, id: string) {
  await deleteDoc(getDocRef(collectionName, id));
}

export async function paginateDocuments<T>(
  collectionName: string,
  pageSize: number,
  constraints: QueryConstraint[] = [],
  lastDoc?: DocumentSnapshot
): Promise<{ data: T[]; lastDoc: DocumentSnapshot | null; hasMore: boolean }> {
  const allConstraints = [...constraints, limit(pageSize + 1)];
  if (lastDoc) {
    allConstraints.push(startAfter(lastDoc));
  }

  const q = query(getCollectionRef(collectionName), ...allConstraints);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const hasMore = docs.length > pageSize;
  const pageDocs = hasMore ? docs.slice(0, pageSize) : docs;

  return {
    data: pageDocs.map((d) => ({ id: d.id, ...d.data() }) as T),
    lastDoc: pageDocs.length > 0 ? pageDocs[pageDocs.length - 1] : null,
    hasMore,
  };
}

export function timestampToISO(timestamp: Timestamp | string): string {
  if (typeof timestamp === "string") return timestamp;
  return timestamp.toDate().toISOString();
}

export { where, orderBy, limit, serverTimestamp };
