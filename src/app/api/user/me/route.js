import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { sitePool } from '@/lib/db';

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autorizado: Token não encontrado." }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // O ID do usuário está no payload do token
    const userId = payload.id;

    const connection = await sitePool.getConnection();

    // Query para buscar dados do usuário, suas contas e seus personagens
    const query = `
      SELECT 
        u.id AS userId, u.name, u.email,
        a.id AS accountId, a.username,
        c.id AS charId, c.nick, c.level, c.class, c.frags
      FROM users u
      LEFT JOIN accounts a ON u.id = a.user_id
      LEFT JOIN characteres c ON a.id = c.account_id
      WHERE u.id = ?;
    `;

    const [rows] = await connection.query(query, [userId]);
    connection.release();

    if (rows.length === 0) {
      return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
    }

    // Estruturar os dados para facilitar o uso no frontend
    const userData = {
      id: rows[0].userId,
      name: rows[0].name,
      email: rows[0].email,
      accounts: [],
    };

    const accountsMap = new Map();

    rows.forEach(row => {
      if (row.accountId) {
        if (!accountsMap.has(row.accountId)) {
          accountsMap.set(row.accountId, {
            id: row.accountId,
            username: row.username,
            characters: [],
          });
        }
        if (row.charId) {
          accountsMap.get(row.accountId).characters.push({
            id: row.charId,
            nick: row.nick,
            level: row.level,
            class: row.class,
            frags: row.frags,
          });
        }
      }
    });

    userData.accounts = Array.from(accountsMap.values());

    return NextResponse.json(userData);

  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    if (error.code === 'ERR_JWT_EXPIRED') {
        return NextResponse.json({ message: "Não autorizado: Token expirado." }, { status: 401 });
    }
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}