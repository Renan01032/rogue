// file: prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const ITEMS_DIR = path.join(process.cwd(), 'public', 'items');

async function main() {
  console.log(`Iniciando o processo de seeding...`);

  console.log(`Limpando dados antigos da tabela Item...`);
  await prisma.item.deleteMany();

  console.log(`Lendo todos os ícones da pasta ${ITEMS_DIR}...`);
  const iconFiles = fs.readdirSync(ITEMS_DIR);

  if (iconFiles.length === 0) {
    console.log("Nenhum ícone encontrado na pasta /public/items. O script de recorte foi executado?");
    return;
  }

  // Prepara os dados para cada ícone encontrado
  const itemsToCreate = iconFiles.map(file => {
    // Cria um nome mais legível a partir do nome do arquivo
    const cleanName = path.parse(file).name.replace(/_/g, ' ').replace('itemicon', 'Icon ');

    return {
      name: cleanName,
      description: `Descrição para ${cleanName}.`,
      rarity: 'Comum', // Podemos definir uma lógica aleatória no futuro
      type: 'Indefinido', // Ou extrair do nome do arquivo se houver um padrão
      imageUrl: `/items/${file}`, // O caminho que o front-end usará
      attributes: {},
    };
  });

  console.log(`Criando ${itemsToCreate.length} itens no banco de dados... (Isso pode demorar um pouco)`);

  // O Prisma é otimizado para lidar com a criação de muitos registros de uma vez
  await prisma.item.createMany({
    data: itemsToCreate,
  });

  console.log(`✅ Seeding finalizado com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });