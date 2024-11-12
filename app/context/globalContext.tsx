"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  SetStateAction,
  Dispatch,
  useMemo,
} from "react";

import { User } from "firebase/auth";
import { auth, isAdmin } from "../firebase/auth";
import { readEbooks, readVideos } from "../firebase/firestore";
import { Ebook, Video } from "../types";

type GlobalContextType = {
  user: User | null;
  isAdmin: boolean;
  ebooks: Ebook[];
  videos: Video[];
  viewEbookForm: boolean;
  viewVideoForm: boolean;
  setViewEbookForm: Dispatch<SetStateAction<boolean>>;
  setViewVideoForm: Dispatch<SetStateAction<boolean>>;
  viewUpdateEbookForm: boolean;
  viewUpdateVideoForm: boolean;
  setViewUpdateEbookForm: Dispatch<SetStateAction<boolean>>;
  setViewUpdateVideoForm: Dispatch<SetStateAction<boolean>>;
  ebookClickedForUpdate: Ebook | null;
  videoClickedForUpdate: Video | null;
  setEbookClickedForUpdate: Dispatch<SetStateAction<Ebook | null>>;
  setVideoClickedForUpdate: Dispatch<SetStateAction<Video | null>>;
};

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  isAdmin: false,
  ebooks: [],
  videos: [],
  viewEbookForm: false,
  viewVideoForm: false,
  setViewEbookForm: () => {},
  setViewVideoForm: () => {},
  viewUpdateEbookForm: false,
  viewUpdateVideoForm: false,
  setViewUpdateEbookForm: () => {},
  setViewUpdateVideoForm: () => {},
  ebookClickedForUpdate: null,
  videoClickedForUpdate: null,
  setEbookClickedForUpdate: () => {},
  setVideoClickedForUpdate: () => {},
});

const EBOOKS_CACHE_KEY = "cached_ebooks";
const VIDEOS_CACHE_KEY = "cached_videos";

const CACHE_EXPIRY_TIME = 1000 * 60 * 15; // * 16; // 16 hours

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminStatus, setAdminStatus] = useState(false);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [viewEbookForm, setViewEbookForm] = useState(false);
  const [viewVideoForm, setViewVideoForm] = useState(false);
  const [viewUpdateEbookForm, setViewUpdateEbookForm] = useState(false);
  const [viewUpdateVideoForm, setViewUpdateVideoForm] = useState(false);
  const [ebookClickedForUpdate, setEbookClickedForUpdate] =
    useState<Ebook | null>(null);
  const [videoClickedForUpdate, setVideoClickedForUpdate] =
    useState<Video | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setAdminStatus(user ? await isAdmin() : false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
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
      } catch (error) {
        console.error("Failed to fetch ebooks:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const cachedVideos = localStorage.getItem(VIDEOS_CACHE_KEY);
        if (cachedVideos) {
          const { data, timestamp } = JSON.parse(cachedVideos);
          if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
            setVideos(data);
            return;
          }
        }

        const data = await readVideos();
        setVideos(data);
        localStorage.setItem(
          VIDEOS_CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchEbooks();
    fetchVideos();
  }, []);

  const values = useMemo(() => {
    return {
      user,
      isAdmin: adminStatus,
      ebooks,
      videos,
      viewEbookForm,
      viewVideoForm,
      setViewEbookForm,
      setViewVideoForm,
      viewUpdateEbookForm,
      viewUpdateVideoForm,
      setViewUpdateEbookForm,
      setViewUpdateVideoForm,
      ebookClickedForUpdate,
      videoClickedForUpdate,
      setEbookClickedForUpdate,
      setVideoClickedForUpdate,
    };
  }, [
    user,
    adminStatus,
    ebooks,
    videos,
    viewEbookForm,
    viewVideoForm,
    viewUpdateEbookForm,
    viewUpdateVideoForm,
    ebookClickedForUpdate,
    videoClickedForUpdate,
  ]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
