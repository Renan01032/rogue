// src/components/layout/Header.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord, FaWhatsapp } from 'react-icons/fa';

export default function Header() {
  const navLinks = [
    { name: 'Início', href: 'https://portalrogue.com.br/' },
    { name: 'Downloads', href: 'https://portalrogue.com.br/downloads' },
    { name: 'Doações', href: 'https://portalrogue.com.br/donate' },
    { name: 'Rankings', href: 'https://portalrogue.com.br/ranking' },
    { name: 'Marketplace', href: '/market' }, // Aponta para nossa página
  ];

  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-sm sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="https://portalrogue.com.br/">
              <Image 
                src="https://portalrogue.com.br/images/logo.png" 
                alt="Rogue Logo" 
                width={150} 
                height={45}
                priority 
              />
            </Link>
          </div>

          {/* Navegação Principal (Desktop) */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ações e Social */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="https://portalrogue.com.br/login" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Login
            </Link>
            <Link href="https://portalrogue.com.br/register" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">
              Registrar
            </Link>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 text-2xl">
              <FaDiscord />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 text-2xl">
              <FaWhatsapp />
            </a>
          </div>

          {/* TODO: Adicionar menu hamburger para mobile */}
          <div className="md:hidden">
            {/* Ícone do Menu Mobile aqui */}
          </div>

        </div>
      </div>
    </header>
  );
}