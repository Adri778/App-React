const Cliente = require('../models/Cliente');

const ClienteController = {
  listar: (req, res) => {
    Cliente.listar((erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao listar clientes' });
      res.json(resultado);
    });
  },

  buscar: (req, res) => {
    Cliente.buscar(req.params.id, (erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao buscar cliente' });
      if (!resultado.length) return res.status(404).json({ erro: 'Cliente não encontrado' });
      res.json(resultado[0]);
    });
  },

  criar: (req, res) => {
    Cliente.criar(req.body, (erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao criar cliente' });
      res.status(201).json({ id: resultado.insertId, ...req.body });
    });
  },
};

module.exports = ClienteController;
