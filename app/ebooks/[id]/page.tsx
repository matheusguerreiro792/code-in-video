"use client";

import React, { useEffect, useState } from "react";
import "./Ebook.css";
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
    <div className="ebook">
      {ebook ? (
        <>
          <Image
            src={ebook.coverUrl}
            alt={ebook.title}
            width={384}
            height={600}
          />
          <div className="details">
            <h2>{ebook.title}</h2>
            <p>{ebook.description}</p>
            <label>Autor: <span>{ebook.author}</span></label>
            <label>Plataforma: <span>{ebook.platform}</span></label>
            <a
              href={ebook.purchaseUrl}
              target="_blank"
              rel="noreferrer"
            >
              Compre Agora
            </a>
          </div>
        </>
      ) : (
        <label>There is no Ebook!</label>
      )}
    </div>
  );
}
