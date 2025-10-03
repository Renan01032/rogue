
const express = require('express');
// Carrega as variáveis de ambiente (DB_HOST, PORT, etc.)
require('dotenv').config(); 

// 2. Importa Configurações e Rotas
const { testConnection } = require('./src/config/db');
const itemRoutes = require('./src/routes/itemRoutes'); 
const userRoutes = require('./src/routes/userRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares
// Permite que o Express leia e parseie o corpo das requisições como JSON
app.use(express.json());

// 4. Definição de Rotas
// Usa o prefixo /api/v1 para todas as rotas da API
app.use('/api/v1', itemRoutes); 

// Adiciona as rotas de usuários, mantendo o prefixo /api/v1/users
app.use('/api/v1/users', userRoutes); 

// 5. Rota de Teste/Saúde (Health Check)
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Market Rogue Backend is running and healthy!',
        status: 'OK',
        api_version: 'v1'
    });
});

// 6. Inicialização do Servidor
async function startServer() {
    try {
        // Tenta conectar ao banco de dados antes de subir o servidor
        await testConnection(); 

        // Se a conexão for OK, inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
            console.log('Rotas disponíveis:');
            console.log(` - GET /api/v1/items`);
            console.log(` - GET /api/v1/users/:userId/balance`);
        });
    } catch (error) {
        console.error("❌ Falha crítica ao iniciar o servidor ou conectar ao DB:", error.message);
        process.exit(1); // Encerra a aplicação
    }
}

startServer();