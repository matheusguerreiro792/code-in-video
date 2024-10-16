"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  SetStateAction,
  Dispatch
} from "react";

import { User } from "firebase/auth";
import { auth, isAdmin } from "../firebase/auth";
import { readEbooks } from "../firebase/firestore";
import { Ebook } from "../types";

type GlobalContextType = {
  user: User | null;
  isAdmin: boolean;
  ebooks: Ebook[];
  viewUpdateEbookForm: boolean;
  setViewUpdateEbookForm: Dispatch<SetStateAction<boolean>>;
  ebookClickedForUpdate: Ebook | null;
  setEbookClickedForUpdate: Dispatch<SetStateAction<Ebook | null>>;
};

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  isAdmin: false,
  ebooks: [],
  viewUpdateEbookForm: false,
  setViewUpdateEbookForm: () => {},
  ebookClickedForUpdate: null,
  setEbookClickedForUpdate: () => {},
});

const EBOOKS_CACHE_KEY = "cached_ebooks";
const CACHE_EXPIRY_TIME = 1000 * 60 // * 60 * 12;

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminStatus, setAdminStatus] = useState(false);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [viewUpdateEbookForm, setViewUpdateEbookForm] = useState(false);
  const [ebookClickedForUpdate, setEbookClickedForUpdate] = useState<Ebook | null>(null);
  

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

    const fetchEbooks = async () => {
      const cachedEbooks = localStorage.getItem(EBOOKS_CACHE_KEY);
      if (cachedEbooks) {
        const { data, timestamp } = JSON.parse(cachedEbooks);
        if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
          setEbooks(data);
          return;
        }
      }

      const data = await readEbooks();
      setEbooks(data);
      localStorage.setItem(
        EBOOKS_CACHE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    };

    fetchEbooks();

    return () => unsubscribe();
  }, []);

  const values = {
    user,
    isAdmin: adminStatus,
    ebooks,
    viewUpdateEbookForm,
    setViewUpdateEbookForm,
    ebookClickedForUpdate,
    setEbookClickedForUpdate
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
