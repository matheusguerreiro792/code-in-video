import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import EbookItem from "./EbookItem/EbookItem";
import "./EbooksList.css";

export default function EbooksList() {
  const { ebooks } = useGlobalContext();

  return (
    <ul className="ebooks-list">
      {ebooks?.length > 0 ? (
        ebooks.map((ebook) => <EbookItem key={ebook.id} ebook={ebook} />)
      ) : (
        <label>There is no Ebooks!</label>
      )}
    </ul>
  );
}
