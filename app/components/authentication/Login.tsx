"use client";

import React, { useState, FormEvent } from "react";
import { login } from "@/app/firebase/auth";
import { useRouter } from "next/navigation";

import "./Login.css";

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
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
