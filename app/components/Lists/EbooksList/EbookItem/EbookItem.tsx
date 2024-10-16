import React from "react";
import { Ebook } from "@/app/types";
import { deleteEbook } from "@/app/firebase/firestore";
import { useGlobalContext } from "@/app/context/globalContext";
import "./EbookItem.css";

interface EbookItemProps {
  key: string;
  ebook: Ebook;
}

export default function EbookItem({ key, ebook }: EbookItemProps) {
  const { setEbookClickedForUpdate, setViewUpdateEbookForm, viewUpdateEbookForm } = useGlobalContext();

  const handleUpdate = async () => {
    setEbookClickedForUpdate(ebook);
    setViewUpdateEbookForm(!viewUpdateEbookForm);
  }

  const handleDelete = async () => {
    await deleteEbook(ebook.id);
    alert("Ebook deletado com sucesso!");
  }

  return (
    <li className="ebook-item" key={key}>
      <h3>{ebook.title}</h3>
      <div className="ud">
        <button onClick={handleUpdate}>Atualizar</button>
        <button onClick={handleDelete}>Deletar</button>
      </div>
    </li>
  );
}
