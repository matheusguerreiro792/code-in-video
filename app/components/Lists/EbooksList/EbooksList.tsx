import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import EbookItem from "./EbookItem/EbookItem";
import "./EbooksList.css";

export default function EbooksList() {
  const { ebooks } = useGlobalContext();

  return (
    <ul className="ebooks-list">
      {ebooks?.map((ebook) => (
        <EbookItem key={ebook.id} ebook={ebook} />
      ))}
    </ul>
  );
}
