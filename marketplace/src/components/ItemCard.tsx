// file: src/components/ItemCard.tsx
import Image from 'next/image';

// Definindo os tipos para o nosso item, para ter autocomplete e segurança.
// Idealmente, isso viria de um arquivo central como src/types/item.ts
type ItemProps = {
  item: {
    id: string;
    name: string;
    imageUrl: string;
  };
};

export default function ItemCard({ item }: ItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer group">
      <div className="relative w-full h-32 bg-gray-900">
        <Image
          src={item.imageUrl}
          alt={`Imagem do item ${item.name}`}
          fill
          style={{ objectFit: 'contain' }} // 'contain' para não cortar a imagem
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-2 text-center">
        <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
      </div>
    </div>
  );
}