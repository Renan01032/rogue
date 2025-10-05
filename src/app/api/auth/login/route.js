import { NextResponse } from 'next/server';
import { sitePool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const TOKEN_NAME = 'authToken';
const MAX_AGE = 60 * 60 * 24; // 1 dia em segundos

export async function POST(request) {
  let connection;
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "E-mail e senha são obrigatórios." }, { status: 400 });
    }

    connection = await sitePool.getConnection();
    
    // 1. Buscar o usuário pelo e-mail no banco
    const [users] = await connection.query('SELECT id, name, email, password FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 }); // Usuário não encontrado
    }

    const user = users[0];

    // 2. Comparar a senha enviada com o hash salvo no banco
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 }); // Senha incorreta
    }

    // 3. Se a senha estiver correta, criar o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: MAX_AGE }
    );

    // 4. Serializar o cookie para ser enviado no cabeçalho da resposta
    const serializedCookie = serialize(TOKEN_NAME, token, {
      httpOnly: true, // Impede acesso via JavaScript no cliente (mais seguro)
      secure: process.env.NODE_ENV === 'production', // Use 'secure' em produção (HTTPS)
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    const response = NextResponse.json({ message: "Login bem-sucedido!" }, { status: 200 });

    // 5. Adicionar o cookie ao cabeçalho da resposta
    response.headers.set('Set-Cookie', serializedCookie);

    return response;

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}