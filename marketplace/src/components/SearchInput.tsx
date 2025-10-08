// file: src/components/SearchInput.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;

    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.replace(`?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
      <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
        <input
          key={searchParams.get('search')} // Garante que o input resete se a URL mudar
          type="text"
          name="search"
          placeholder="Buscar item por nome..."
          defaultValue={searchParams.get('search') || ''}
          className="w-full bg-gray-800 text-white p-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-3 px-6 hover:bg-blue-700 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}