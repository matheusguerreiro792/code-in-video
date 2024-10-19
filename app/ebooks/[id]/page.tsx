"use client";

import React, { useEffect, useState } from "react";
import { Ebook as EbookType } from "@/app/types";
import { useGlobalContext } from "@/app/context/globalContext";
import Image from "next/image";

export default function Ebook({ params }: { params: { id: string } }) {
  const { ebooks } = useGlobalContext();
  const [ebook, setEbook] = useState<EbookType | null>(null);

  useEffect(() => {
    if (ebooks?.length > 0) {
      setEbook(ebooks.find((ebook) => ebook.id === params.id) || null);
    }
  }, [ebooks, params.id]);

  return (
    <div className="bg-gray-50 flex flex-1 p-8 gap-8">
      {ebook ? (
        <>
          <Image
            className="w-max h-auto rounded object-contain"
            src={ebook.coverUrl}
            alt={ebook.title}
            width={384}
            height={600}
          />
          <div className="flex flex-col gap-4 text-lg text-justify">
            <h2 className="text-4xl font-bold">{ebook.title}</h2>
            <p>{ebook.description}</p>
            <label className="text-lg font-bold">
              Autor: <span className="font-normal">{ebook.author}</span>
            </label>
            <label className="text-lg font-bold">
              Plataforma: <span className="font-normal">{ebook.platform}</span>
            </label>
            <a
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl uppercase font-bold py-3 px-4 mt-4 w-fit rounded"
              href={ebook.purchaseUrl}
              target="_blank"
              rel="noreferrer"
            >
              Compre Agora
            </a>
          </div>
        </>
      ) : (
        <label>Não há Livro!</label>
      )}
    </div>
  );
}
