import BASE_URL from './api';

export const listarVendas = () =>
  fetch(`${BASE_URL}/vendas`).then(r => r.json());

// Reservado para a integração (ainda não usado pelas telas):
// export const buscarVenda = (id) =>
//   fetch(`${BASE_URL}/vendas/${id}`).then(r => r.json());
