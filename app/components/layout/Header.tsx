"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const headerClass = pathname === "/" ? "hidden" : "bg-gray-900 text-gray-50 flex gap-2 px-2 py-2 items-end";

  return (
    <header className={headerClass}>
      <Image
        src="/code_in_book_and_video.png"
        alt="Código em Livro e Vídeo"
        width={64}
        height={64}
      />
      <h1 className="flex items-baseline font-ubuntuMono gap-2 text-4xl">
        Código<span className="text-2xl">em Livro e Vídeo</span>
      </h1>
    </header>
  );
}
