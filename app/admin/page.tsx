"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/globalContext";

export default function Admin() {
  const { user, isAdmin } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login");
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="bg-black text-white flex flex-col flex-1">

    </div>
  );
}
