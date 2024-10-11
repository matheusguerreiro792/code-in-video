"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Nav.css";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="nav bg-gray-800 text-white flex justify-center items-center gap-4 px-4 py-3">
      <Link href="/" className={isActive("/") ? "active-blue" : ""}>
        Home
      </Link>
      <Link href="/ebooks" className={isActive("/ebooks") ? "active-red" : ""}>
        Ebooks
      </Link>
    </nav>
  );
}
