import Image from 'next/image';

export default function Sidebar() {
  // No futuro, receberemos uma função para aplicar os filtros via props
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Filtros</h2>

      {/* Filtro por Tipo de Item */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-300 mb-2">Categorias</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-colors">
            <Image src="/assets/sword_icon.png" alt="Arma" width={24} height={24} />
            <span className="text-white">Armas</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-colors">
            <Image src="/assets/shield_icon.png" alt="Escudo" width={24} height={24} />
            <span className="text-white">Escudos</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-colors">
            <Image src="/assets/armor_icon.png" alt="Armadura" width={24} height={24} />
            <span className="text-white">Armaduras</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-colors">
            <Image src="/assets/potion_icon.png" alt="Poção" width={24} height={24} />
            <span className="text-white">Poções</span>
          </li>
        </ul>
      </div>

      {/* Filtro por Raridade */}
      <div>
        <h3 className="font-semibold text-gray-300 mb-2">Raridade</h3>
        <ul className="space-y-2">
            <li className="text-gray-400 cursor-pointer hover:text-white">Comum</li>
            <li className="text-blue-400 cursor-pointer hover:text-blue-300">Raro</li>
            <li className="text-purple-400 cursor-pointer hover:text-purple-300">Épico</li>
            <li className="text-yellow-400 cursor-pointer hover:text-yellow-300">Lendário</li>
        </ul>
      </div>
      {/* TODO: Adicionar lógica de filtro com useState */}
    </aside>
  );
}