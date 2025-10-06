// file: scripts/process-sprites.ts
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Definição de onde cada ícone está na sprite sheet
// Supondo que cada ícone tem 64x64 pixels
const spriteSheetPath = path.join(process.cwd(), 'public', 'spritesheet.png');
const outputDir = path.join(process.cwd(), 'public', 'items');
const iconSize = 64;

// Mapeamento dos ícones. Você precisará preencher isso com base nos seus dados.
// O 'id' deve corresponder ao ID do item no banco de dados.
const iconMap = [
  { id: 'cuid_da_espada_longa', row: 0, col: 0 },
  { id: 'cuid_do_escudo_de_ferro', row: 0, col: 1 },
  // ... adicione todos os outros itens aqui
];

async function cropIcons() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Iniciando recorte de ícones...');

  for (const icon of iconMap) {
    const left = icon.col * iconSize;
    const top = icon.row * iconSize;
    const outputPath = path.join(outputDir, `${icon.id}.png`);

    await sharp(spriteSheetPath)
      .extract({ left, top, width: iconSize, height: iconSize })
      .toFile(outputPath);
    
    console.log(`Ícone ${icon.id}.png criado com sucesso.`);
  }

  console.log('Processo finalizado!');
}

cropIcons();