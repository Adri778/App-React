const Produto = require('../models/Produto');

const ProdutoController = {
  listar: (req, res) => {
    Produto.listar((erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao listar produtos' });
      res.json(resultado);
    });
  },

  buscar: (req, res) => {
    Produto.buscar(req.params.id, (erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao buscar produto' });
      if (!resultado.length) return res.status(404).json({ erro: 'Produto não encontrado' });
      res.json(resultado[0]);
    });
  },

  criar: (req, res) => {
    Produto.criar(req.body, (erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao criar produto' });
      res.status(201).json({ id: resultado.insertId, ...req.body });
    });
  },

  estoquesBaixos: (req, res) => {
    Produto.estoquesBaixos((erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao buscar estoques baixos' });
      res.json(resultado);
    });
  },
};

module.exports = ProdutoController;
