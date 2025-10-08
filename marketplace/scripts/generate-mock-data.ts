// file: scripts/generate-mock-data.ts
import fs from 'fs';
import path from 'path';

const ITEMS_DIR = path.join(process.cwd(), 'public', 'items');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'lib', 'mock-data.ts');

function generateMockData() {
  console.log('Lendo arquivos de ícones da pasta /public/items...');
  const iconFiles = fs.readdirSync(ITEMS_DIR);

  if (iconFiles.length === 0) {
    console.error('Nenhum ícone encontrado. Execute o script process-sprites primeiro.');
    return;
  }

  console.log(`Encontrados ${iconFiles.length} ícones. Gerando mock data...`);

  const mockItemsArray = iconFiles.map((file, index) => {
    const cleanName = path.parse(file).name.replace(/_/g, ' ').replace('itemicon', 'Icon ');
    
    // Criamos um objeto para cada item
    return {
      id: `${index + 1}`,
      name: cleanName,
      description: `Descrição para o item ${cleanName}.`,
      rarity: 'Comum',
      type: 'Indefinido',
      imageUrl: `/items/${file}`,
      attributes: {},
      createdAt: new Date(),
    };
  });

  // Criamos o conteúdo completo do arquivo .ts
  const fileContent = `
import { Item } from '@/types/item';

// Este arquivo foi gerado automaticamente por scripts/generate-mock-data.ts
export const mockItems: Item[] = ${JSON.stringify(mockItemsArray, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);

  console.log(`✅ Arquivo ${OUTPUT_FILE} gerado com sucesso com ${mockItemsArray.length} itens!`);
}

generateMockData();