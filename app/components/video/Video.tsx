"use client";

import React from "react";
import { Video as VideoType } from "@/app/types";

export default function Video({ video }: { video: VideoType }) {
  return (
    <div className="flex w-1/4 h-fit bg-transparent rounded overflow-hidden">
      <iframe
        className="w-full aspect-video"
        src={video.videoUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
