'use client';

import ItemIcon from '@/components/ItemIcon';

export default function ItemCard({ offer, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative border border-gray-200 rounded-lg shadow-md bg-gray-50/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500"
    >
      <div className="p-4 flex flex-col items-center text-center">
        {/* Ícone do Item com um fundo sutil */}
        <div className="relative w-20 h-20 flex justify-center items-center bg-gray-200 rounded-md mb-4 group-hover:bg-blue-100 transition-colors">
          <ItemIcon
            url={offer.spriteSheetUrl}
            x={offer.spriteX}
            y={offer.spriteY}
            width={offer.iconWidth || 64} // Garante um tamanho
            height={offer.iconHeight || 64}
            alt={offer.itemName}
          />
        </div>
        
        {/* Nome do Item */}
        <h3 className="text-base font-semibold text-gray-800 truncate w-full" title={offer.itemName}>
          {offer.itemName}
        </h3>
        
        {/* Vendedor */}
        <p className="text-xs text-gray-500 mb-2">
          {offer.sellerName}
        </p>
        
        {/* Preço */}
        <p className="text-lg font-bold text-yellow-600">
          R$ {parseFloat(offer.price).toFixed(2)}
        </p>
      </div>
      
      {/* Faixa "Ver Detalhes" que aparece no hover */}
      <div className="absolute bottom-0 left-0 w-full bg-blue-600 text-white text-center text-sm py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Ver Detalhes
      </div>
    </div>
  );
}