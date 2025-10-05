'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() { // <--- 'async' removido
  return (
    <main className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Rogue MarketPlace!</h1>
      <p className="text-lg text-gray-700">
        Navegue pelo nosso site para ver as últimas ofertas do mercado, rankings e muito mais.
      </p>
    </main>
  );
}