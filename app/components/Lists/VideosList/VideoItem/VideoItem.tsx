import React from "react";
import { Video } from "@/app/types";
import { deleteVideo } from "@/app/firebase/firestore";
import { useGlobalContext } from "@/app/context/globalContext";

interface VideoItemProps {
  key: string;
  video: Video;
}

export default function VideoItem({ key, video }: VideoItemProps) {
  const {
    setVideoClickedForUpdate,
    setViewUpdateVideoForm,
    viewUpdateVideoForm,
  } = useGlobalContext();

  const handleUpdate = async () => {
    setVideoClickedForUpdate(video);
    setViewUpdateVideoForm(!viewUpdateVideoForm);
  };

  const handleDelete = async () => {
    await deleteVideo(video.id);
    alert("Video deletado com sucesso!");
  };

  return (
    <li
      className="bg-gray-100 flex justify-between items-center py-2 pr-2 pl-4 rounded"
      key={key}
    >
      <h3 className="text-lg font-bold">{video.title}</h3>
      <div className="flex gap-2">
        <button
          className="font-bold px-3 py-2 rounded border-2 border-black bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200"
          onClick={handleUpdate}
        >
          Atualizar
        </button>
        <button
          className="font-bold px-3 py-2 rounded border-2 border-black text-white bg-red-600 hover:bg-red-700 active:bg-red-800"
          onClick={handleDelete}
        >
          Deletar
        </button>
      </div>
    </li>
  );
}
