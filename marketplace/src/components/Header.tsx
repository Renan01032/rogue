import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'Início', href: 'https://portalrogue.com.br' },
  { name: 'Notícias', href: 'https://portalrogue.com.br/news' },
  { name: 'Guias', href: 'https://portalrogue.com.br/guides' },
  { name: 'Ranking', href: 'https://portalrogue.com.br/ranking' },
  { name: 'Download', href: 'https://portalrogue.com.br/downloads' },
  { name: 'Loja', href: 'https://portalrogue.com.br/loja' },
];

export default function Header() {
  return (
    <header className="w-full bg-black/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        {/* Navegação Principal */}
        <nav>
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-yellow-400 hover:text-yellow-200 transition-colors tracking-wider uppercase"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 👇 BOTÃO NOVO ADICIONADO AQUI 👇 */}
          <Link href="/items/new" className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
            Cadastrar Item
          </Link>

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
          <a href="https://portalrogue.com.br/login" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
            <Image 
              src="/assets/btn-entrar.png" 
              alt="Botão Entrar" 
              width={120} // Ajuste a largura conforme o tamanho da sua imagem
              height={45} // Ajuste a altura conforme o tamanho da sua imagem
            />
          </a>
          <a href="https://portalrogue.com.br/registrar" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
            <Image 
              src="/assets/btn-registrar.png" 
              alt="Botão Registrar" 
              width={140} // Ajuste a largura conforme o tamanho da sua imagem
              height={45} // Ajuste a altura conforme o tamanho da sua imagem
            />
          </a>
        </div>
      </div>
    </header>
  );
}