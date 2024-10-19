"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/globalContext";
import EbookForm from "../components/Forms/EbookForm";
import EbooksList from "../components/Lists/EbooksList/EbooksList";

export default function Admin() {
  const {
    user,
    isAdmin,
    viewEbookForm,
    setViewEbookForm,
    viewUpdateEbookForm,
    setViewUpdateEbookForm,
    ebookClickedForUpdate,
  } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login");
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    if (ebookClickedForUpdate) {
      setViewUpdateEbookForm(true);
    }
  }, [ebookClickedForUpdate]);

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="bg-black flex flex-col flex-1 p-4 gap-4 items-center">
      <h1 className="text-4xl font-bold bg-yellow-400 p-4 w-full text-center rounded">
        Admin
      </h1>
      <button
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-lg py-2 px-3 border-2 w-fit rounded"
        onClick={() => setViewEbookForm(!viewEbookForm)}
      >
        Ebook
      </button>
      {viewEbookForm && <EbookForm />}
      {viewUpdateEbookForm && <EbookForm ebook={ebookClickedForUpdate} />}
      <EbooksList />
    </div>
  );
}
