// src/app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"; // Importa nosso novo Header

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rogue MarketPlace",
  description: "Mercado de itens do servidor Rogue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-200`}>
        <Header /> {/* Adiciona o Header aqui */}
        <main>
          {children} {/* O conteúdo da página será renderizado aqui */}
        </main>
        {/* TODO: Adicionar um componente de Footer aqui no futuro */}
      </body>
    </html>
  );
}