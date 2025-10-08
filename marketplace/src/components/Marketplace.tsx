'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/types/item';
import Sidebar from '@/components/Sidebar';
import ItemGrid from '@/components/ItemGrid';

// Este componente recebe a lista inicial de itens do servidor
export default function Marketplace({ initialItems }: { initialItems: Item[] }) {
  const [filteredItems, setFilteredItems] = useState<Item[]>(initialItems);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);

  useEffect(() => {
    let tempItems = [...initialItems];

    if (selectedType) {
      tempItems = tempItems.filter(item => item.type === selectedType);
    }
    if (selectedRarity) {
      tempItems = tempItems.filter(item => item.rarity === selectedRarity);
    }
    setFilteredItems(tempItems);
  }, [selectedType, selectedRarity, initialItems]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Sidebar
        onSelectType={setSelectedType}
        onSelectRarity={setSelectedRarity}
        selectedType={selectedType}
        selectedRarity={selectedRarity}
      />
      <ItemGrid items={filteredItems} />
    </div>
  );
}