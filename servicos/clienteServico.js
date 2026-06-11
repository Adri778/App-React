import BASE_URL from './api';

export const listarClientes = () =>
  fetch(`${BASE_URL}/clientes`).then(r => r.json());

export const buscarCliente = (id) =>
  fetch(`${BASE_URL}/clientes/${id}`).then(r => r.json());

export const criarCliente = (dados) =>
  fetch(`${BASE_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(r => r.json());
