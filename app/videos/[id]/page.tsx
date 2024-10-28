"use client";

import React, { useEffect, useState } from "react";
import { Video as VideoType } from "@/app/types";
import { useGlobalContext } from "@/app/context/globalContext";
import Image from "next/image";

export default function Video({ params }: { params: { id: string } }) {
  const { videos } = useGlobalContext();
  const [video, setVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    if (videos?.length > 0) {
      setVideo(videos.find((video) => video.id === params.id) || null);
    }
  }, [videos, params.id]);

  return (
    <div className="bg-gray-50 flex flex-1 p-8 gap-8">
      {video ? (
        <>
          <Image
            className="w-max h-auto rounded object-contain"
            src={video.imageUrl}
            alt={video.title}
            width={640}
            height={360}
          />
          <div className="flex flex-col gap-4 text-lg text-justify">
            <h2 className="text-4xl font-bold">{video.title}</h2>
            <p>{video.description}</p>
            <label className="text-lg font-bold">
              Instrutor: <span className="font-normal">{video.instructor}</span>
            </label>
            <label className="text-lg font-bold">
              Plataforma: <span className="font-normal">{video.platform}</span>
            </label>
            <a
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl uppercase font-bold py-3 px-4 mt-4 w-fit rounded"
              href={video.videoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Assista Agora
            </a>
          </div>
        </>
      ) : (
        <label>Não há Vídeo!</label>
      )}
    </div>
  );
}
