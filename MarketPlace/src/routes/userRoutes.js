// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a rota GET para consultar o saldo
// Endpoint: GET /api/v1/users/:userId/balance
router.get('/:userId/balance', userController.getUserBalance);

module.exports = router;