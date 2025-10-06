// file: src/app/page.tsx
import ItemCard from '@/components/ItemCard';

// Supondo que você crie este tipo em src/types/item.ts
type Item = {
  id: string;
  name: string;
  imageUrl: string;
  // ...outros campos que você tenha
};

// Função que busca os dados no servidor
async function getItems(): Promise<Item[]> {
  // ATENÇÃO: Verifique se sua API está rodando e retornando os itens
  // A URL deve ser a URL completa da sua aplicação
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`, {
    cache: 'no-store', // Para desenvolvimento, evita cache
  });

  if (!res.ok) {
    // Se der erro, a página mostrará uma mensagem de erro
    throw new Error('Falha ao buscar os itens da API');
  }

  return res.json();
}

export default async function CatalogPage() {
  const items = await getItems();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Catálogo de Itens do Jogo "Rogue"</h1>
      
      {items.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum item encontrado no banco de dados.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}