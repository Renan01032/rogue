'use client';

import ItemIcon from "./ItemIcon";

export default function ItemDetailModal({ offer, onClose }) {
  if (!offer) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in flex">
        {/* Coluna da Esquerda: Ícone e Detalhes Principais */}
        <div className="w-1/3 bg-gray-100 p-6 flex flex-col items-center justify-center rounded-l-lg">
          <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-lg mb-4">
            <ItemIcon
              url={offer.spriteSheetUrl}
              x={offer.spriteX}
              y={offer.spriteY}
              width={offer.iconWidth || 64}
              height={offer.iconHeight || 64}
              alt={offer.itemName}
            />
          </div>
          <h2 className="text-2xl font-bold text-center">{offer.itemName}</h2>
          <p className="text-sm text-gray-600 text-center">Vendido por: {offer.sellerName}</p>
        </div>

        {/* Coluna da Direita: Descrição, Preço e Stats */}
        <div className="w-2/3 p-6 flex flex-col">
          <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700">&times;</button>
          
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-500 text-sm mb-1">DESCRIÇÃO</h3>
            <p className="text-gray-700 mb-4">{offer.itemDescription || "Este item não possui uma descrição."}</p>

            {(offer.aff0 > 0 || offer.aff1 > 0 || offer.aff2 > 0) && (
              <>
                <h3 className="font-semibold text-gray-500 text-sm mb-1">ADICIONAIS</h3>
                <ul className="text-blue-600 space-y-1">
                  {offer.aff0 > 0 && <li>{`[${offer.eff0}: ${offer.aff0}]`}</li>}
                  {offer.aff1 > 0 && <li>{`[${offer.eff1}: ${offer.aff1}]`}</li>}
                  {offer.aff2 > 0 && <li>{`[${offer.eff2}: ${offer.aff2}]`}</li>}
                </ul>
              </>
            )}
          </div>
          
          <div className="border-t pt-4 mt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">PREÇO</p>
              <p className="text-2xl font-bold text-yellow-700">R$ {parseFloat(offer.price).toFixed(2)}</p>
            </div>
            <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}