"use client";

import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Ebook } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Ebooks() {
  const { ebooks } = useGlobalContext();

  const router = useRouter();

  const handleEbookClick = (ebook: Ebook) => {
    router.push(`/ebooks/${ebook.id}`);
  };

  return (
    <div className="bg-gray-50 flex flex-1 flex-wrap p-8 gap-8">
      {ebooks?.length > 0 ? (
        ebooks.map((ebook) => (
          <Image
            className="h-max w-auto rounded border-2 border-transparent hover:border-2 hover:border-black cursor-pointer active:opacity-75"
            src={ebook.coverUrl}
            alt={ebook.title}
            key={ebook.id}
            width={256}
            height={400}
            onClick={() => handleEbookClick(ebook)}
          />
        ))
      ) : (
        <label className="text-red-600 font-bold">Não há Livros!</label>
      )}
    </div>
  );
}
