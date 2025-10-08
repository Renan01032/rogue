// file: scripts/process-sprites.ts
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// --- CONFIGURAÇÕES ---
const SPRITES_DIR = path.join(process.cwd(), 'spritesheets');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'items');
const ICON_SIZE = 48; // Aparentemente seus ícones têm 48x48 pixels. Ajuste se necessário.
// --------------------

async function processAllSprites() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SPRITES_DIR).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

  if (files.length === 0) {
    console.log('Nenhuma spritesheet encontrada na pasta /spritesheets.');
    return;
  }

  console.log(`Encontradas ${files.length} spritesheets para processar...`);

  for (const file of files) {
    const filePath = path.join(SPRITES_DIR, file);
    const fileNameWithoutExt = path.parse(file).name;
    
    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height) {
        console.error(`Não foi possível ler as dimensões da imagem: ${file}`);
        continue;
      }

      const cols = Math.floor(metadata.width / ICON_SIZE);
      const rows = Math.floor(metadata.height / ICON_SIZE);

      console.log(`Processando ${file} (${cols}x${rows} ícones)...`);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const left = x * ICON_SIZE;
          const top = y * ICON_SIZE;
          
          const outputFileName = `${fileNameWithoutExt}_${y}_${x}.png`;
          const outputPath = path.join(OUTPUT_DIR, outputFileName);
          
          await image
            .clone() // Usamos clone para não modificar a imagem original em memória
            .extract({ left, top, width: ICON_SIZE, height: ICON_SIZE })
            .toFile(outputPath);
        }
      }
      console.log(`✅ ${file} processado com sucesso.`);

    } catch (error) {
      console.error(`Erro ao processar o arquivo ${file}:`, error);
    }
  }
  console.log('\nProcessamento de todas as spritesheets finalizado!');
}

processAllSprites();