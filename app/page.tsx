import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-home bg-gray-900 flex flex-col justify-center items-center gap-4 px-8">
      <Image
        className="object-contain h-2/3"
        src="/code_in_book_and_video_with_white_title_and_subtitle.png"
        alt="Logo"
        width={1536}
        height={1471}
      />
    </div>
  );
}
