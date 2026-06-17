import BASE_URL from './api';

export const listarProdutos = () =>
  fetch(`${BASE_URL}/produtos`).then(r => r.json());

export const criarProduto = (dados) =>
  fetch(`${BASE_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(r => r.json());