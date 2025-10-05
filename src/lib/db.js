import mysql from 'mysql2/promise';

// Configuração base com as credenciais do seu .env
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexão para o banco de dados do SITE (`wydsite`)
export const sitePool = mysql.createPool({
  ...dbConfig, // Reutiliza a configuração base
  database: process.env.DB_SITE_NAME // Aponta para o banco do site
});

// Pool de conexão para o banco de dados do JOGO (`market_rogue`)
export const gamePool = mysql.createPool({
  ...dbConfig, // Reutiliza a configuração base
  database: process.env.DB_GAME_NAME // Aponta para o banco do mercado
});

console.log('Pools de conexão configurados.');
console.log(`Site DB: ${process.env.DB_SITE_NAME}, Game DB: ${process.env.DB_GAME_NAME}`);