import React, { useState, FormEvent } from "react";
import { Video } from "@/app/types";
import { createVideo, updateVideo } from "@/app/firebase/firestore";
import { useGlobalContext } from "@/app/context/globalContext";

interface VideoFormProps {
  video?: Video | null;
}

export default function VideoForm({ video }: VideoFormProps) {
  const { setViewVideoForm, setViewUpdateVideoForm } = useGlobalContext();
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [imageUrl, setImageUrl] = useState(video?.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState(video?.videoUrl || "");
  const [technology, setTechnology] = useState(video?.technology || "");
  const [operationalSystem, setOperationalSystem] = useState(
    video?.operationalSystem || ""
  );
  const [instructor, setInstructor] = useState(video?.instructor || "");
  const [platform, setPlatform] = useState(video?.platform || "");

  const setInitialValues = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setVideoUrl("");
    setOperationalSystem("");
    setTechnology("");
    setInstructor("");
    setPlatform("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const videoData = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      videoUrl: videoUrl.trim(),
      technology: technology.trim(),
      instructor: instructor.trim(),
      operationalSystem: operationalSystem.trim(),
      platform: platform.trim(),
      createdAt: video?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (video?.id) {
      await updateVideo(video.id, videoData);
      alert("Video atualizado com sucesso!");
      setInitialValues();
      setViewUpdateVideoForm(false);
    } else {
      await createVideo(videoData);
      alert("Video criado com sucesso!");
      setInitialValues();
      setViewVideoForm(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded flex flex-col gap-4 justify-center items-center py-5 px-4 w-1/2">
      <h2 className="text-2xl font-bold text-yellow-400 uppercase">Video</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 w-full items-center bg-gray-600 rounded"
      >
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <textarea
          className="px-3 py-2 text-black w-full rounded"
          placeholder="Descricão"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="URL da Imagem"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="URL do Video"
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="Tecnologia"
          value={technology}
          onChange={(event) => setTechnology(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="Sistema Operacional"
          value={operationalSystem}
          onChange={(event) => setOperationalSystem(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(event) => setInstructor(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="Plataforma"
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
          required
        />
        <button
          className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 text-black border-2 border-black text-lg uppercase font-bold text-center py-2 px-3 w-fit rounded"
          type="submit"
        >
          {video?.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
