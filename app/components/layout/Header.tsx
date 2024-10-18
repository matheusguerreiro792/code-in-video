"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Header.css";

export default function Header() {
  const pathname = usePathname();
  const headerClass = pathname === "/" ? "hidden" : "header";

  return (
    <header className={headerClass}>
      <Image
        src="/code_in_book_and_video.png"
        alt="Código em Livro e Vídeo"
        width={64}
        height={64}
      />
      <h1>
        Código<span>em Livro e Vídeo</span>
      </h1>
    </header>
  );
}
