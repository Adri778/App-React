const mysql = require('mysql2');

// As credenciais vêm de variáveis de ambiente, nunca do código.
// Copie `.env.example` para `.env` e preencha os valores da sua máquina.
// O `.env` é ignorado pelo git, então a senha nunca chega ao repositório.
const conexao = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bom_preco',
});

conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro.message);
    console.error('Confira os valores de DB_HOST, DB_USER, DB_PASSWORD e DB_NAME no seu arquivo .env.');
    return;
  }
  console.log('Banco de dados conectado com sucesso.');
});

module.exports = conexao;
