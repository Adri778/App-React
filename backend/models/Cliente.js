const db = require('../config/db');

const Cliente = {
  listar: (cb) => db.query('SELECT * FROM clientes ORDER BY nome', cb),
  buscar: (id, cb) => db.query('SELECT * FROM clientes WHERE id = ?', [id], cb),
  criar: (dados, cb) => db.query('INSERT INTO clientes SET ?', dados, cb),
  contagem: (cb) => db.query('SELECT COUNT(*) AS total FROM clientes', cb),
};

module.exports = Cliente;
