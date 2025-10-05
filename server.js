// server.js (Atualizado)
const express = require('express');
const { testConnection } = require('./src/lib/db');
require('dotenv').config();

// --- NOVO: Importa as rotas de itens ---
const itemRoutes = require('./src/routes/itemRoutes'); 
// ---------------------------------------

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- NOVO: Adiciona o prefixo /api/v1 para as rotas ---
app.use('/api/v1', itemRoutes); 
// --------------------------------------------------------

// Rota de Teste (Health Check)
app.get('/', (req, res) => {
    // ... (Mantém o código anterior)
});

async function startServer() {
    await testConnection(); 
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}

startServer();