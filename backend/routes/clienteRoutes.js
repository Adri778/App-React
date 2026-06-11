const express = require('express');
const rota = express.Router();
const ClienteController = require('../controllers/ClienteController');

rota.get('/', ClienteController.listar);
rota.get('/:id', ClienteController.buscar);
rota.post('/', ClienteController.criar);

module.exports = rota;
