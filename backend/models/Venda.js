const db = require('../config/db');

const Venda = {
  listar: (cb) => db.query(
    'SELECT v.*, c.nome AS cliente_nome FROM vendas v LEFT JOIN clientes c ON v.cliente_id = c.id ORDER BY v.criado_em DESC',
    cb
  ),
  buscar: (id, cb) => db.query(
    'SELECT v.*, c.nome AS cliente_nome FROM vendas v LEFT JOIN clientes c ON v.cliente_id = c.id WHERE v.id = ?',
    [id], cb
  ),
};

module.exports = Venda;
