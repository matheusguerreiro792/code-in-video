import { app } from "./config";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { Ebook, Course, Video } from "../types";

export const db = getFirestore(app);

// eBooks CRUD
export const createEbook = async (ebook: Omit<Ebook, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "ebooks"), {
    ...ebook,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
};

export const readEbook = async (id: string) => {
  const docRef = doc(db, "ebooks", id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists()
    ? ({ id: docSnap.id, ...docSnap.data() } as Ebook)
    : null;
};

export const updateEbook = async (id: string, ebook: Partial<Ebook>) => {
  const docRef = doc(db, "ebooks", id);

  await updateDoc(docRef, {
    ...ebook,
    updatedAt: new Date(),
  });
};

export const deleteEbook = async (id: string) => {
  const docRef = doc(db, "ebooks", id);

  await deleteDoc(docRef);
};

export const readEbooks = async () => {
  const querySnapshot = await getDocs(collection(db, "ebooks"));

  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Ebook)
  );
};

// Courses CRUD
export const createCourse = async (course: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "courses"), {
    ...course,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
};

export const readCourse = async (id: string) => {
  const docRef = doc(db, "courses", id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists()
    ? ({ id: docSnap.id, ...docSnap.data() } as Course)
    : null;
};

export const updateCourse = async (id: string, course: Partial<Course>) => {
  const docRef = doc(db, "courses", id);

  await updateDoc(docRef, {
    ...course,
    updatedAt: new Date(),
  });
};

export const deleteCourse = async (id: string) => {
  const docRef = doc(db, "courses", id);

  await deleteDoc(docRef);
};

export const readCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));

  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Course)
  );
};

// Videos CRUD
export const createVideo = async (video: Omit<Video, "id">) => {
  const docRef = await addDoc(collection(db, "videos"), {
    ...video,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
};

export const readVideo = async (id: string) => {
  const docRef = doc(db, "videos", id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists()
    ? ({ id: docSnap.id, ...docSnap.data() } as Video)
    : null;
};

export const updateVideo = async (id: string, video: Partial<Video>) => {
  const docRef = doc(db, "videos", id);

  await updateDoc(docRef, {
    ...video,
    updatedAt: new Date(),
  });
};

export const deleteVideo = async (id: string) => {
  const docRef = doc(db, "videos", id);

  await deleteDoc(docRef);
};

export const readVideos = async () => {
  const querySnapshot = await getDocs(collection(db, "videos"));

  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Video)
  );
};
