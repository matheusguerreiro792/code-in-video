"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

import { User } from "firebase/auth";
import { auth, isAdmin } from "../firebase/auth";

type GlobalContextType = {
  user: User | null;
  isAdmin: boolean;
};

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  isAdmin: false,
});

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const adminCheck = await isAdmin();
        setAdminStatus(adminCheck);
      } else {
        setAdminStatus(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const values = {
    user,
    isAdmin: adminStatus,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
