import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white flex justify-center items-center py-2">
      RS &copy; {year} código em Livro e Vídeo
    </footer>
  );
}
