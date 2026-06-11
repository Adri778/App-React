const express = require('express');
const rota = express.Router();
const VendaController = require('../controllers/VendaController');

rota.get('/', VendaController.listar);
rota.get('/:id', VendaController.buscar);
rota.patch('/:id/status', VendaController.atualizarStatus);

module.exports = rota;
