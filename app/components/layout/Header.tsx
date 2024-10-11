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
      <Image src="/white_logo_256.png" alt="Logo" width={64} height={64} />
      <h1 className="text-3xl font-bold">Compartilhando Conhecimento</h1>
    </header>
  );
}
