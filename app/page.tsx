import React from "react";
import Image from "next/image";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Image
        src="/code_in_book_and_video.png"
        alt="Logo"
        width={1536}
        height={973}
      />
      <h1>código</h1>
      <h3>em Livro e Vídeo</h3>
    </div>
  );
}
