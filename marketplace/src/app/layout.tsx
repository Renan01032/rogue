// file: src/app/layout.tsx
import type { Metadata } from 'next';
import { Cinzel } from 'next/font/google'; // Importando a fonte
import './globals.css';

// Importando nosso novo componente de Header
import Header from '@/components/Header';

// Configuração da fonte
const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['700'], // Vamos pegar apenas o peso bold (700)
});

export const metadata: Metadata = {
  title: 'Marketplace - Jogo Rogue',
  description: 'Compre e venda itens do universo Rogue!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* Aplicando a classe da fonte no body */}
      <body className={`${cinzel.className} bg-gray-900`}>
        <Header /> {/* <-- NOSSO HEADER AQUI */}
        
        {/* O conteúdo da página (children) é renderizado abaixo do header */}
        {children}
        
        {/* Você pode adicionar um Footer aqui no futuro */}
      </body>
    </html>
  );
}