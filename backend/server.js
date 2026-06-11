const express = require('express');
const cors = require('cors');
const Produto = require('./models/Produto');
const Cliente = require('./models/Cliente');

const produtoRoutes = require('./routes/produtoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const vendaRoutes = require('./routes/vendaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/vendas', vendaRoutes);

app.get('/resumo', (req, res) => {
  Produto.contagem((e1, rProdutos) => {
    if (e1) return res.status(500).json({ erro: 'Erro ao buscar resumo' });
    Cliente.contagem((e2, rClientes) => {
      if (e2) return res.status(500).json({ erro: 'Erro ao buscar resumo' });
      Produto.contagemEstoqueBaixo((e3, rEstoque) => {
        if (e3) return res.status(500).json({ erro: 'Erro ao buscar resumo' });
        res.json({
          produtos: rProdutos[0].total,
          clientes: rClientes[0].total,
          estoqueBaixo: rEstoque[0].total,
        });
      });
    });
  });
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
