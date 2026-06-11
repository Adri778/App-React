const db = require('../config/db');

const Venda = {
  listar: (cb) => db.query('SELECT * FROM vendas ORDER BY criado_em DESC', cb),
  buscar: (id, cb) => db.query('SELECT * FROM vendas WHERE id = ?', [id], cb),
  atualizarStatus: (id, status, cb) =>
    db.query('UPDATE vendas SET status = ? WHERE id = ?', [status, id], cb),
};

module.exports = Venda;
