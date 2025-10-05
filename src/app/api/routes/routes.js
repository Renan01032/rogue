import { NextResponse } from 'next/server';
import { gamePool } from '@/lib/db'; // Usaremos o mesmo pool de conexão

// Função para o método GET
export async function GET(request) {
  try {
    const connection = await gamePool.getConnection();
    
    // A nova query agora usa JOIN para combinar as tabelas
    const query = `
      SELECT
        offer.id,
        offer.price,
        offer.quantity,
        item.name AS itemName,
        item.description AS itemDescription,
        seller.name AS sellerName,
        icone.sprite_sheet_url AS spriteSheetUrl,
        icone.sprite_position_x AS spriteX,
        icone.sprite_position_y AS spriteY,
        icone.icon_width AS iconWidth,
        icone.icon_height AS iconHeight
      FROM offer
      JOIN item ON offer.item_id = item.id
      JOIN user AS seller ON offer.seller_user_id = seller.id
      JOIN icone ON item.icone_id = icone.id
      WHERE offer.is_active = 1
      ORDER BY item.name ASC;
    `;
    
    const [rows] = await connection.query(query);
    
    connection.release();

    // A resposta da API agora será uma lista de ofertas completas
    return NextResponse.json({ offers: rows });

  } catch (error) {
    console.error('Falha ao buscar ofertas do mercado:', error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}