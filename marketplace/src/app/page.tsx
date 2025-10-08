'use client'; 

import { useState, useEffect } from 'react';
import { Item } from '@/types/item.ts'; 
import { mockItems } from '@/lib/mock-data'; // Importando nossos dados estáticos
import Sidebar from '@/components/Sidebar';
import ItemGrid from '@/components/ItemGrid';

export default function CatalogPage() {
  // No futuro, os itens virão da API. Por enquanto, usamos os dados estáticos.
  const [items, setItems] = useState<Item[]>([]);
  
  // O useState e useEffect são "Hooks" que só funcionam em Client Components
  useEffect(() => {
    // Simula o carregamento dos dados
    setItems(mockItems);
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Marketplace do Jogo "Rogue"
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna da Esquerda */}
        <Sidebar />

        {/* Coluna da Direita */}
        <ItemGrid items={items} />
      </div>
    </main>
  );
}