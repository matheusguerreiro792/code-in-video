import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white flex justify-center items-center p-2">
      RS &copy; {year} Compartilhando Conhecimento
    </footer>
  );
}
