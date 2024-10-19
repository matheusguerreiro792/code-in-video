"use client";

import React, { useState, FormEvent } from "react";
import { login } from "@/app/firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="bg-gray-700 text-white flex flex-col gap-4 rounded-lg w-1/4 py-5 px-4"
      onSubmit={handleSubmit}
    >
      <input
        className="px-3 py-2 text-black rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        className="px-3 py-2 text-black rounded"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button
        className="bg-g-blue hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-4 rounded"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}
