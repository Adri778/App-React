import BASE_URL from './api';

export const listarProdutos = () =>
  fetch(`${BASE_URL}/produtos`).then(r => r.json());

export const buscarProduto = (id) =>
  fetch(`${BASE_URL}/produtos/${id}`).then(r => r.json());

export const criarProduto = (dados) =>
  fetch(`${BASE_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(r => r.json());

export const estoquesBaixos = () =>
  fetch(`${BASE_URL}/produtos/estoque-baixo`).then(r => r.json());
