// src/controllers/userController.js
const { pool } = require('../config/db');

// Controller para consultar o saldo do usuário
const getUserBalance = async (req, res) => {
    // Captura o ID do usuário dos parâmetros da URL
    const { userId } = req.params; 

    // Query SQL para buscar apenas o campo 'balance'
    const query = `
        SELECT 
            balance 
        FROM 
            User 
        WHERE 
            id = ?;
    `;
    
    try {
        // O array de valores substitui o '?' na query, prevenindo SQL Injection
        const [rows] = await pool.query(query, [userId]); 

        // CRITÉRIO DE ACEITAÇÃO: 404 Not Found
        if (rows.length === 0) {
            return res.status(404).json({ message: `Usuário com ID ${userId} não encontrado.` });
        }

        // Retorna o status 200 (OK) e o saldo (primeiro item do array)
        return res.status(200).json({ 
            userId: parseInt(userId),
            balance: rows[0].balance 
        });

    } catch (error) {
        console.error(`Erro ao buscar saldo do usuário ${userId}:`, error);
        return res.status(500).json({ 
            message: 'Erro interno ao consultar saldo.', 
            error: error.message 
        });
    }
};

module.exports = {
    getUserBalance
};