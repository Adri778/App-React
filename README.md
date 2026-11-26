# Bom Preço — Painel de Controle

Aplicativo mobile de gestão para o lojista: cadastra produtos, acompanha o estoque e enxerga o resumo das vendas geradas pelo site de e-commerce.

**Não é o aplicativo do cliente final.** É a ferramenta interna de quem administra a loja — um *backoffice* que cabe no bolso.

> Documentação de arquitetura, decisões e detalhamento das camadas: [`RELATORIO_TECNICO.md`](RELATORIO_TECNICO.md).

---

## O problema que ele resolve

Quem administra uma loja pequena costuma descobrir que um produto acabou pelo pedido que não consegue atender. O controle vive numa planilha que ninguém atualiza na hora da correria, e a consulta exige sentar no computador.

O Bom Preço coloca três coisas na mão do lojista, de qualquer lugar:

- o que existe em estoque **agora**;
- quais produtos estão abaixo do mínimo, antes de faltar;
- o cadastro de um produto novo, sem abrir o computador.

O mesmo produto cadastrado aqui alimenta a vitrine do site: imagem, preço original, promoção, frete grátis e link de afiliado. Um cadastro, dois destinos.

---

## Arquitetura

```
┌─────────────────────────┐        ┌──────────────────────────┐
│   App React Native      │        │   Site (e-commerce)      │
│   (painel do lojista)   │        │   (clientes compram)     │
└────────────┬────────────┘        └────────────┬─────────────┘
             │  HTTP / JSON                      │  HTTP / JSON
             ▼                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  API REST — Express (Node.js)                │
└────────────────────────────┬────────────────────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │   MySQL — bom_preco  │
                  └──────────────────────┘
```

O aplicativo e o site consomem a **mesma API**. O back-end é o ponto único de verdade sobre os dados, o que evita o estoque divergir entre as duas pontas.

O back-end segue **MVC**: `routes/` recebe a requisição, `controllers/` decide, `models/` conversa com o banco. O `ProdutoController` filtra os campos aceitos na entrada, em vez de repassar o corpo da requisição direto ao banco — proteção contra *mass assignment*.

---

## Telas

| Tela | Função |
|---|---|
| `Splash` | Abertura com a identidade da loja |
| `Inicio` | Resumo: total de produtos e quantos estão com estoque baixo |
| `Produtos` | Lista o catálogo e abre o cadastro em `WebView`, atualizando a lista ao fechar |
| `Estoque` | Produtos abaixo do mínimo, para reposição |

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Aplicativo | React Native 0.81, Expo 54, React 19 |
| Navegação | React Navigation 7 (*native stack*) |
| Cadastro embutido | `react-native-webview` |
| API REST | Node.js, Express 4 |
| Banco de dados | MySQL 8 (`mysql2`) |
| Configuração | `dotenv` + variáveis de ambiente |

---

## Como rodar

Pré-requisitos: **Node.js 18+**, **MySQL 8** e o aplicativo **Expo Go** no celular (ou um emulador Android).

### 1. Banco de dados

Crie um banco chamado `bom_preco` no MySQL.

### 2. Back-end

```bash
cd backend
npm install
copy .env.example .env
```

Abra o `.env` e preencha os dados do seu MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=bom_preco
PORT=3000
```

Suba a API:

```bash
npm start
```

Deve aparecer `Banco de dados conectado com sucesso.` e `Servidor rodando na porta 3000`.

### 3. Aplicativo

Na raiz do projeto:

```bash
npm install
copy .env.example .env
```

Ajuste o endereço da API conforme onde você vai testar:

| Onde | Valor de `EXPO_PUBLIC_API_URL` |
|---|---|
| Emulador Android | `http://10.0.2.2:3000/api` |
| Celular físico | `http://SEU-IP-NA-REDE:3000/api` |

No celular físico, o aparelho e o computador precisam estar **na mesma rede Wi-Fi**. Descubra o IP com `ipconfig` (Windows) ou `ifconfig` (Linux/macOS).

```bash
npm start
```

Leia o QR Code com o Expo Go.

---

## Configuração

Nenhuma credencial ou endereço fica escrito no código. Tudo vem de variáveis de ambiente, documentadas em `.env.example` (um na raiz, outro em `backend/`). O `.env` real é ignorado pelo git.

> **Atenção:** variáveis com o prefixo `EXPO_PUBLIC_` são embutidas no pacote do aplicativo e podem ser lidas por quem tiver o APK. Use apenas para endereços e configurações públicas — **nunca** para senha, token ou chave.

---

## API

| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/produtos` | Lista todos os produtos |
| `GET` | `/produtos/estoque-baixo` | Produtos abaixo do estoque mínimo |
| `GET` | `/produtos/:id` | Detalhe de um produto |
| `POST` | `/produtos` | Cadastra um produto |
| `GET` | `/resumo` | Totais para a tela inicial |

---

## Limitações conhecidas

- **Sem autenticação.** A API não exige login; qualquer um na mesma rede alcança os dados. É aceitável no uso em rede local, mas precisa de autenticação antes de ir para a internet.
- **Cadastro por `WebView`.** O formulário de produto é a página web do admin aberta dentro do app, não uma tela nativa. Funciona, mas depende do site estar no ar.
- **Sem edição e sem exclusão pelo app.** Só listagem, consulta e cadastro.
- **Sem testes automatizados.**

---

## Estrutura

```
.
├── telas/              # Telas do aplicativo (View)
├── servicos/           # Comunicação com a API
├── assets/             # Ícones e splash
├── backend/
│   ├── config/db.js    # Conexão MySQL via variáveis de ambiente
│   ├── controllers/    # Regras de entrada e saída
│   ├── models/         # Acesso ao banco
│   ├── routes/         # Definição das rotas
│   └── server.js       # Inicialização da API
├── .env.example        # Modelo de configuração do app
└── RELATORIO_TECNICO.md
```

---

## Licença

Projeto de estudo, livre para consulta e reuso.
