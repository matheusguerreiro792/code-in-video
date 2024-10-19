import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import EbookItem from "./EbookItem/EbookItem";

export default function EbooksList() {
  const { ebooks } = useGlobalContext();

  return (
    <ul className="bg-gray-700 flex flex-col gap-4 p-4 w-full rounded">
      {ebooks?.length > 0 ? (
        ebooks.map((ebook) => <EbookItem key={ebook.id} ebook={ebook} />)
      ) : (
        <label className="text-lg text-red-600 font-bold text-center">
          There is no Ebooks!
        </label>
      )}
    </ul>
  );
}
