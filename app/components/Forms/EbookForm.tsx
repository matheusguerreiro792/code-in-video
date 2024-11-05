import React, { useState, FormEvent } from "react";
import { Ebook } from "@/app/types";
import { createEbook, updateEbook } from "@/app/firebase/firestore";
import { useGlobalContext } from "@/app/context/globalContext";

interface EbookFormProps {
  ebook?: Ebook | null;
}

export default function EbookForm({ ebook }: EbookFormProps) {
  const { setViewEbookForm, setViewUpdateEbookForm } = useGlobalContext();
  const [title, setTitle] = useState(ebook?.title || "");
  const [description, setDescription] = useState(ebook?.description || "");
  const [coverUrl, setCoverUrl] = useState(ebook?.coverUrl || "");
  const [price, setPrice] = useState(ebook?.price || 0);
  const [purchaseUrl, setPurchaseUrl] = useState(ebook?.purchaseUrl || "");
  const [technology, setTechnology] = useState(ebook?.technology || "");
  const [author, setAuthor] = useState(ebook?.author || "");
  const [platform, setPlatform] = useState(ebook?.platform || "");

  const setInitialValues = () => {
    setTitle("");
    setDescription("");
    setCoverUrl("");
    setPrice(0);
    setPurchaseUrl("");
    setTechnology("");
    setAuthor("");
    setPlatform("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ebookData = {
      title: title.trim(),
      description: description.trim(),
      coverUrl: coverUrl.trim(),
      price,
      purchaseUrl: purchaseUrl.trim(),
      technology: technology.trim(),
      author: author.trim(),
      platform: platform.trim(),
      createdAt: ebook?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (ebook?.id) {
      await updateEbook(ebook.id, ebookData);
      alert("Ebook atualizado com sucesso!");
      setInitialValues();
      setViewUpdateEbookForm(false);
    } else {
      await createEbook(ebookData);
      alert("Ebook criado com sucesso!");
      setInitialValues();
      setViewEbookForm(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded flex flex-col gap-4 justify-center items-center py-5 px-4 w-1/2">
      <h2 className="text-2xl font-bold text-yellow-400 uppercase">Ebook</h2>
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
          placeholder="URL da Capa"
          value={coverUrl}
          onChange={(event) => setCoverUrl(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="URL da Compra"
          value={purchaseUrl}
          onChange={(event) => setPurchaseUrl(event.target.value)}
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
          placeholder="Autor"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
        />
        <input
          className="px-3 py-2 text-black w-full rounded"
          type="text"
          placeholder="Plataforma"
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
        />
        <button
          className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 text-black border-2 border-black text-lg uppercase font-bold text-center py-2 px-3 w-fit rounded"
          type="submit"
        >
          {ebook?.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
