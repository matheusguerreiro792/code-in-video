"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/app/context/globalContext";
import { logout } from "@/app/firebase/auth";
import "./Nav.css";

export default function Nav() {
  const { user, isAdmin } = useGlobalContext();
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
      {isAdmin && (
        <Link href="/admin" className={isActive("/admin") ? "active-blue" : ""}>
          Admin
        </Link>
      )}
      {user && (
        <Link
          href="#"
          onClick={logout}
        >
          Logout
        </Link>
      )}
    </nav>
  );
}
