import React, { useState, FormEvent } from "react";
import { Ebook } from "@/app/types";
import { createEbook, updateEbook } from "@/app/firebase/firestore";
import { useGlobalContext } from "@/app/context/globalContext";

import "./EbookForm.css";

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
  const [category, setCategory] = useState(ebook?.category || "");
  const [author, setAuthor] = useState(ebook?.author || "");
  const [platform, setPlatform] = useState(ebook?.platform || "");

  const setInitialValues = () => {
    setTitle("");
    setDescription("");
    setCoverUrl("");
    setPrice(0);
    setPurchaseUrl("");
    setCategory("");
    setAuthor("");
    setPlatform("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ebookData = {
      title,
      description,
      coverUrl,
      price,
      purchaseUrl,
      category,
      author,
      platform,
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
    <div className="ebook-form">
      <h2>Ebook</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value.trim())}
          required
        />
        <textarea
          placeholder="Descricão"
          value={description}
          onChange={(event) => setDescription(event.target.value.trim())}
          required
        />
        <input
          type="text"
          placeholder="URL da Capa"
          value={coverUrl}
          onChange={(event) => setCoverUrl(event.target.value.trim())}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value.trim()))}
          required
        />
        <input
          type="text"
          placeholder="URL da Compra"
          value={purchaseUrl}
          onChange={(event) => setPurchaseUrl(event.target.value.trim())}
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value.trim())}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(event) => setAuthor(event.target.value.trim())}
          required
        />
        <input
          type="text"
          placeholder="Plataforma"
          value={platform}
          onChange={(event) => setPlatform(event.target.value.trim())}
          required
        />
        <button type="submit">{ebook?.id ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  );
}
