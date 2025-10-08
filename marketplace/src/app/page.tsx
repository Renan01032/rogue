import prisma from '@/lib/prisma';
import ItemGrid from '@/components/ItemGrid';
import SearchInput from '@/components/SearchInput';


async function getItems(query: string | undefined) {

  const whereClause = query ? {
    name: {
      contains: query,
      mode: 'insensitive',
    },
  } : {};

  const items = await prisma.item.findMany({
    where: whereClause, // Usamos a cláusula construída aqui
    orderBy: {
      name: 'asc',
    },
  });
  return items;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const searchQuery = searchParams?.search;
  const allItems = await getItems(searchQuery);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Marketplace 
      </h1>
      
      <SearchInput />
      
      <ItemGrid items={allItems} />
    </main>
  );
}