const Venda = require('../models/Venda');

const VendaController = {
  listar: (req, res) => {
    Venda.listar((erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao listar vendas' });
      res.json(resultado);
    });
  },

  buscar: (req, res) => {
    Venda.buscar(req.params.id, (erro, resultado) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao buscar venda' });
      if (!resultado.length) return res.status(404).json({ erro: 'Venda não encontrada' });
      res.json(resultado[0]);
    });
  },

  atualizarStatus: (req, res) => {
    const STATUS_VALIDOS = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'];
    const { status } = req.body;
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }
    Venda.atualizarStatus(req.params.id, status, (erro) => {
      if (erro) return res.status(500).json({ erro: 'Erro ao atualizar status' });
      res.json({ id: Number(req.params.id), status });
    });
  },
};

module.exports = VendaController;
