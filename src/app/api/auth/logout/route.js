// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  // Para fazer logout, simplesmente invalidamos o cookie.
  // Fazemos isso setando um novo cookie com o mesmo nome,
  // mas com data de expiração no passado.
  const serializedCookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // O segredo está aqui: uma idade máxima negativa
    path: '/',
  });

  const response = NextResponse.json({ message: "Logout bem-sucedido!" }, { status: 200 });
  response.headers.set('Set-Cookie', serializedCookie);

  return response;
}