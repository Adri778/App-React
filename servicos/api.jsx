// Endereço da API REST, lido de variável de ambiente.
// Copie `.env.example` para `.env` na raiz do projeto e informe o valor certo:
//   Emulador Android ....... http://10.0.2.2:3000/api
//   Dispositivo físico ..... http://SEU-IP-NA-REDE:3000/api
// O prefixo EXPO_PUBLIC_ é exigido pelo Expo para expor a variável ao aplicativo.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000/api';

export default BASE_URL;
