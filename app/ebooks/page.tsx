"use client";

import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Ebook } from "@/app/types";
import "./Ebooks.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Ebooks() {
  const { ebooks } = useGlobalContext();

  const router = useRouter();

  const handleEbookClick = (ebook: Ebook) => {
    router.push(`/ebooks/${ebook.id}`);
  };

  return (
    <div className="ebooks">
      {ebooks?.length > 0 ? (
        ebooks.map((ebook) => (
          <Image
            src={ebook.coverUrl}
            alt={ebook.title}
            key={ebook.id}
            width={256}
            height={400}
            onClick={() => handleEbookClick(ebook)}
          />
        ))
      ) : (
        <label>There is no Ebooks!</label>
      )}
    </div>
  );
}
