import { Item } from './app/types/item'; 
import ItemCard from './ItemCard';

type ItemGridProps = {
  items: Item[];
};

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="flex-1">
      {items.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum item encontrado com esses filtros.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}