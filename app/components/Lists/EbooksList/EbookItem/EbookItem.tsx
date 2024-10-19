import React from "react";
import { Ebook } from "@/app/types";
import { deleteEbook } from "@/app/firebase/firestore";
import { useGlobalContext } from "@/app/context/globalContext";

interface EbookItemProps {
  key: string;
  ebook: Ebook;
}

export default function EbookItem({ key, ebook }: EbookItemProps) {
  const {
    setEbookClickedForUpdate,
    setViewUpdateEbookForm,
    viewUpdateEbookForm,
  } = useGlobalContext();

  const handleUpdate = async () => {
    setEbookClickedForUpdate(ebook);
    setViewUpdateEbookForm(!viewUpdateEbookForm);
  };

  const handleDelete = async () => {
    await deleteEbook(ebook.id);
    alert("Ebook deletado com sucesso!");
  };

  return (
    <li
      className="bg-gray-100 flex justify-between items-center py-2 pr-2 pl-4 rounded"
      key={key}
    >
      <h3 className="text-lg font-bold">{ebook.title}</h3>
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
