'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/market/ItemCard';
import ItemDetailModal from '@/components/market/ItemDetailModal';

export default function MarketPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para controlar o modal

  useEffect(() => {
    async function fetchMarketOffers() {
      try {
        setLoading(true);
        const response = await fetch('/api/market');
        if (!response.ok) throw new Error('Falha ao carregar os dados do mercado.');
        const data = await response.json();
        setOffers(data.offers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMarketOffers();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Carregando ofertas do mercado...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Mercado de Itens</h1>
      
      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <ItemCard 
              key={offer.id} 
              offer={offer} 
              onClick={() => setSelectedItem(offer)} // Abre o modal ao clicar
            />
          ))
        ) : (
          <p className="col-span-full text-center">Nenhuma oferta ativa no momento.</p>
        )}
      </div>

      {/* O Modal (só aparece quando um item é selecionado) */}
      <ItemDetailModal 
        offer={selectedItem} 
        onClose={() => setSelectedItem(null)} // Fecha o modal
      />
    </div>
  );
}