// file: src/lib/auth.ts
import { cookies } from 'next/headers';

// Em um cenário real, você decodificaria um JWT ou validaria
// o cookie de sessão contra o seu serviço de auth principal.
export async function getCurrentUser() {
  const sessionCookie = cookies().get('session_token')?.value;

  if (!sessionCookie) {
    return null;
  }

  // Lógica de validação do token (ex: decodificar JWT)
  // Mock para este exemplo
  try {
    // const decodedToken = jwt.verify(sessionCookie, process.env.JWT_SECRET);
    return {
      id: 'user_12345', // ID do usuário vindo do token
      name: 'RoguePlayer' // Nome vindo do token
    };
  } catch (error) {
    return null;
  }
}