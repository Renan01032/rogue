'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao fazer login.');
      }
      
      // Se o login for bem-sucedido, o cookie foi setado pelo servidor.
      // Agora podemos redirecionar o usuário.
      router.push('/dashboard'); // Vamos criar essa página depois

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Entrar</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Seu E-mail" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="password" placeholder="Sua Senha" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          
          <button type="submit" disabled={isLoading} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        <p className="text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}