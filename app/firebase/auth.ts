import { app } from "./config";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (): Promise<boolean> => {
  const user = auth.currentUser;

  if (!user) {
    return false;
  }

  return true;
};
