'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/market/ItemCard';
import ItemDetailModal from '@/components/market/ItemDetailModal';

// Intervalo de atualização em milissegundos (ex: 10 segundos)
const POLLING_INTERVAL = 10000; 

export default function MarketPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Colocamos a lógica de busca em uma função separada para poder reutilizá-la
  const fetchMarketOffers = async () => {
    try {
      // Não mostra "Carregando..." em cada atualização, apenas na primeira
      // setLoading(true); // Removido para atualizações silenciosas
      const response = await fetch('/api/market');
      if (!response.ok) throw new Error('Falha ao carregar os dados do mercado.');
      const data = await response.json();
      setOffers(data.offers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Garante que o loading inicial termine
    }
  };

  useEffect(() => {
    // 1. Busca os dados imediatamente quando a página carrega
    fetchMarketOffers();

    // 2. Configura um intervalo para buscar os dados repetidamente
    const intervalId = setInterval(fetchMarketOffers, POLLING_INTERVAL);

    // 3. Limpa o intervalo quando o componente é desmontado (MUITO IMPORTANTE)
    // Isso evita que a busca continue rodando mesmo que o usuário saia da página
    return () => clearInterval(intervalId);
  }, []); // O array vazio [] garante que isso rode apenas uma vez (na montagem)

  // O resto do seu componente continua igual...
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ... seu código de header e etc ... */}
      <main>
        {loading && <div className="text-center py-10">Carregando ofertas...</div>}
        {error && <div className="text-center py-10 text-red-500">Erro: {error}</div>}
        
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {/* ... o map dos ItemCards ... */}
            {offers.map((offer) => (
              <ItemCard 
                key={offer.id} 
                offer={offer} 
                onClick={() => setSelectedItem(offer)}
              />
            ))}
          </div>
        )}
      </main>
      <ItemDetailModal offer={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}