"use client";

import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { useRouter } from "next/navigation";
import { Video } from "@/app/types";
import Image from "next/image";

export default function page() {
  const { videos } = useGlobalContext();

  const router = useRouter();

  const handleVideoClick = (video: Video) => {
    router.push(`/videos/${video.id}`);
  };

  return (
    <div className="bg-gray-50 flex flex-1 flex-wrap p-8 gap-8">
      {videos?.length > 0 ? (
        videos.map((video) => (
          <Image
            className="h-max w-auto rounded border-2 border-transparent hover:border-2 hover:border-black cursor-pointer active:opacity-75"
            src={video.imageUrl}
            alt={video.title}
            key={video.id}
            width={426}
            height={240}
            onClick={() => handleVideoClick(video)}
          />
        ))
      ) : (
        <label className="text-red-600 font-bold">Não há Vídeos!</label>
      )}
    </div>
  );
}
