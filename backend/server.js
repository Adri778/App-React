const express = require('express');
const cors = require('cors');

const produtoRoutes = require('./routes/produtoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/clientes', clienteRoutes);

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
