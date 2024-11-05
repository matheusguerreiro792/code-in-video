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
            className="h-fit rounded object-contain"
            src={ebook.coverUrl}
            alt={ebook.title}
            width={480}
            height={679}
          />
          <div className="flex flex-col gap-4 text-lg text-justify">
            <h2 className="text-4xl font-bold text-left">{ebook.title}</h2>
            <p>{ebook.description}</p>
            {ebook.lessons && (
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">O que você vai Aprender:</h3>
                <ul className="list-disc">
                  {ebook.lessons.map((lesson) => (
                    <li className="ml-6" key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </div>
            )}
            {ebook.highlights && (
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Destaques do Livro:</h3>
                <ul className="list-disc">
                  {ebook.highlights.map((highlight) => (
                    <li className="ml-6" key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            <label className="text-lg font-bold">
              Autor: <span className="font-normal">{ebook.author}</span>
            </label>
            {ebook.platform && (
              <label className="text-lg font-bold">
                Plataforma:{" "}
                <span className="font-normal">{ebook.platform}</span>
              </label>
            )}
            <a
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl uppercase font-bold py-3 px-4 mt-4 w-fit rounded"
              href={ebook.purchaseUrl}
              target="_blank"
              rel="noreferrer"
            >
              {ebook.price > 0 ? "Compre Agora" : "Baixe Agora"}
            </a>
          </div>
        </>
      ) : (
        <label>Não há Livro!</label>
      )}
    </div>
  );
}
