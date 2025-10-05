// src/app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"; // Importa nosso novo Header

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rogue MarketPlace",
  description: "Mercado de itens do servidor Rogue",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-200`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}