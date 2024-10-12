import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "./context/globalContext";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Compartilhando Conhecimento",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <GlobalProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <Nav />
          <main>{children}</main>
          <Footer />
        </body>
      </GlobalProvider>
    </html>
  );
}
