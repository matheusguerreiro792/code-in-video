import React from "react";
import Image from "next/image";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Image src="/white_logo_1024.png" alt="Logo" width={1024} height={1024} />
    </div>
  );
}
