import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-home bg-gray-900 flex flex-col justify-center items-center gap-4">
      <Image
        className="object-contain h-1/2"
        src="/code_in_book_and_video.png"
        alt="Logo"
        width={1536}
        height={973}
      />
      <h1 className="text-gray-50 text-8xl tracking-wide font-ubuntuMono">
        código
      </h1>
      <h3 className="text-gray-50 text-4xl">em Livro e Vídeo</h3>
    </div>
  );
}
