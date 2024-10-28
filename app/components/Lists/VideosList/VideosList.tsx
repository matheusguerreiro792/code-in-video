import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import VideoItem from "./VideoItem/VideoItem";

export default function VideosList() {
  const { videos } = useGlobalContext();

  return (
    <ul className="bg-gray-700 flex flex-col gap-4 p-4 w-full rounded">
      {videos?.length > 0 ? (
        videos.map((video) => <VideoItem key={video.id} video={video} />)
      ) : (
        <label className="text-lg text-red-600 font-bold text-center">
          There is no Videos!
        </label>
      )}
    </ul>
  );
}
