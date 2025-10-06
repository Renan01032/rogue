// file: src/app/api/items/[id]/route.ts (VERSÃO SIMPLIFICADA)
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: params.id },
    }); // O 'include' foi removido daqui

    if (!item) {
      return new NextResponse('Item not found', { status: 404 });
    }
    {return NextResponse.json(
    { error: 'Internal Server Error' }, 
    { status: 500 }
    );
}