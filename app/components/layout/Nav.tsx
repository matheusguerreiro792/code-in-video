"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/app/context/globalContext";
import { logout } from "@/app/firebase/auth";

export default function Nav() {
  const { user, isAdmin } = useGlobalContext();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const linkClass = "text-white text-lg hover:underline";

  return (
    <nav className="bg-gray-800 text-white flex justify-center items-center gap-4 px-4 py-3">
      <Link
        href="/"
        className={isActive("/") ? `${linkClass} font-bold` : linkClass}
      >
        Home
      </Link>
      <Link
        href="/ebooks"
        className={isActive("/ebooks") ? `${linkClass} font-bold` : linkClass}
      >
        Livros
      </Link>
      <Link
        href="/videos"
        className={isActive("/videos") ? `${linkClass} font-bold` : linkClass}
      >
        Vídeos
      </Link>
      {isAdmin && (
        <Link
          href="/admin"
          className={isActive("/admin") ? `${linkClass} font-bold` : linkClass}
        >
          Admin
        </Link>
      )}
      {user && (
        <Link href="#" onClick={logout}>
          Logout
        </Link>
      )}
    </nav>
  );
}
