# Relatório Técnico — Bom Preço (App de Controle)

## 1. Visão Geral

O **Bom Preço** é um sistema dividido em duas frentes:

- **Site (e-commerce):** onde os clientes navegam e realizam compras.
- **Aplicativo mobile (este repositório):** painel de controle para o gestor da loja — gerencia produtos, clientes, estoque e visualiza vendas geradas pelo site.

O app **não é voltado ao cliente final**. É uma ferramenta interna de gestão (backoffice mobile).

---

## 2. Arquitetura do Sistema

```
┌─────────────────────────┐        ┌──────────────────────────┐
│   App React Native      │        │   Site (e-commerce)      │
│   (Painel do Gestor)    │        │   (Clientes compram)     │
└────────────┬────────────┘        └────────────┬─────────────┘
             │  HTTP (JSON)                      │  HTTP (JSON)
             ▼                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend Express (Node.js)                   │
│              Porta 3000 — API REST JSON                      │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   MySQL — bom_preco  │
                  └──────────────────────┘
```

Tanto o app quanto o site consomem a mesma API REST. O backend é o ponto central de dados.

---

## 3. Stack Tecnológica

### Frontend (App Mobile)
| Tecnologia | Versão | Papel |
|---|---|---|
| React Native | 0.81.5 | Framework mobile cross-platform |
| Expo | ~54.0.33 | Toolchain de build e desenvolvimento |
| React Navigation | 7.x | Navegação entre telas (native-stack) |
| @expo-google-fonts/roboto | — | Tipografia (Roboto Regular + Bold) |

### Backend
| Tecnologia | Versão | Papel |
|---|---|---|
| Node.js | — | Ambiente de execução |
| Express | ^4.18.2 | Framework HTTP/REST |
| mysql2 | ^3.6.0 | Driver de conexão com MySQL |
| cors | ^2.8.5 | Permite requisições do app e do site |

### Banco de Dados
| Tecnologia | Papel |
|---|---|
| MySQL | Persistência relacional dos dados |

---

## 4. Estrutura de Arquivos

```
App-React/
│
├── index.js                  # Ponto de entrada — registra o componente raiz no Expo
├── app.json                  # Configuração do Expo (nome, ícone, splash, orientação)
├── package.json              # Dependências do frontend
│
├── telas/                    # Telas (componentes de página)
│   ├── Aplicativo.js         # Configuração do navegador e rotas
│   ├── Splash.js             # Tela de carregamento inicial (2,5 s)
│   ├── Inicio.js             # Dashboard — resumo e menu de navegação
│   ├── Produtos.js           # Listagem e cadastro de produtos
│   ├── Clientes.js           # Listagem e cadastro de clientes
│   ├── Estoque.js            # Visão de estoque com alertas de quantidade baixa
│   └── Vendas.js             # Listagem de pedidos gerados pelo site
│
├── servicos/                 # Camada de integração com a API
│   ├── api.js                # BASE_URL do backend
│   ├── produtoServico.js     # Funções fetch para /produtos
│   ├── clienteServico.js     # Funções fetch para /clientes
│   └── vendaServico.js       # Funções fetch para /vendas
│
├── assets/                   # Imagens estáticas
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
└── backend/
    ├── server.js             # Servidor Express — registra rotas e inicia na porta 3000
    ├── package.json          # Dependências do backend
    ├── config/
    │   └── db.js             # Conexão MySQL (mysql2)
    ├── models/               # Consultas SQL (acesso ao banco)
    │   ├── Produto.js
    │   ├── Cliente.js
    │   └── Venda.js
    ├── controllers/          # Lógica de requisição/resposta HTTP
    │   ├── ProdutoController.js
    │   ├── ClienteController.js
    │   └── VendaController.js
    └── routes/               # Definição dos endpoints REST
        ├── produtoRoutes.js
        ├── clienteRoutes.js
        └── vendaRoutes.js
```

---

## 5. Banco de Dados

### Diagrama de Tabelas

```
produtos                    clientes
─────────────────           ─────────────────
id (PK)                     id (PK)
nome                        nome
preco                       email
descricao                   telefone
quantidade                  endereco
estoque_minimo              criado_em
categoria

vendas                      itens_venda
─────────────────           ─────────────────
id (PK)                     id (PK)
cliente_id (FK)             venda_id (FK)
total                       produto_id (FK)
status                      quantidade
criado_em                   preco_unitario
```

### Relacionamentos
- `vendas.cliente_id` → `clientes.id`
- `itens_venda.venda_id` → `vendas.id`
- `itens_venda.produto_id` → `produtos.id`

---

## 6. API REST — Endpoints

### Produtos — `/produtos`
| Método | Rota | Ação |
|---|---|---|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Busca um produto pelo ID |
| POST | `/produtos` | Cadastra novo produto |
| GET | `/produtos/estoque-baixo` | Lista produtos com `quantidade <= estoque_minimo` |

### Clientes — `/clientes`
| Método | Rota | Ação |
|---|---|---|
| GET | `/clientes` | Lista todos os clientes |
| GET | `/clientes/:id` | Busca um cliente pelo ID |
| POST | `/clientes` | Cadastra novo cliente |

### Vendas — `/vendas`
| Método | Rota | Ação |
|---|---|---|
| GET | `/vendas` | Lista todas as vendas (com nome do cliente via JOIN) |
| GET | `/vendas/:id` | Busca uma venda pelo ID |

### Dashboard — `/resumo`
| Método | Rota | Resposta |
|---|---|---|
| GET | `/resumo` | `{ produtos, clientes, estoqueBaixo }` |

> A API adota o padrão **CR (Create + Read)** — operações de Update e Delete são gerenciadas pelo site ou por acesso direto ao banco.

---

## 7. Padrão Arquitetural do Backend

O backend segue o padrão **MVC sem View** (Model-Controller-Route):

```
Requisição HTTP
      │
      ▼
  Route (define o endpoint e delega)
      │
      ▼
  Controller (valida a resposta, trata erros HTTP)
      │
      ▼
  Model (executa a query SQL no banco)
      │
      ▼
  Banco MySQL
```

Cada camada tem responsabilidade única:
- **Route:** apenas mapeia verbo HTTP + path → função do controller.
- **Controller:** recebe `req`/`res`, chama o model, devolve JSON.
- **Model:** contém apenas as queries SQL, sem lógica HTTP.

---

## 8. Fluxo de Navegação do App

```
Splash (2,5 s)
     │
     ▼
  Início (Dashboard)
     │
     ├──► Produtos   → Lista → Modal "Novo Produto"
     │
     ├──► Clientes   → Lista → Modal "Novo Cliente"
     │
     ├──► Estoque    → Lista ordenada por quantidade (alertas visuais)
     │
     └──► Vendas     → Lista de pedidos do site com badges de status
```

Todas as telas internas possuem botão "← Voltar" que retorna ao Dashboard via `navigation.goBack()`.

O Dashboard usa `useFocusEffect` para atualizar os cards de resumo sempre que o usuário retorna à tela, garantindo dados sempre atualizados.

---

## 9. Decisões Técnicas

| Decisão | Motivo |
|---|---|
| Expo (não bare React Native) | Simplifica build, fontes, assets e desenvolvimento |
| mysql2 com callbacks (não promises) | Consistente com o padrão já adotado no `db.js` do projeto |
| Fetch nativo (não axios) | Sem dependência extra; suficiente para CR simples |
| Modal bottom-sheet (não tela separada) | Menos navegação; experiência mais fluida para formulários curtos |
| `useFocusEffect` no Dashboard | Dados do resumo se atualizam ao voltar de qualquer tela |
| CR apenas (sem Update/Delete) | Operações destrutivas ficam no site ou no banco, reduzindo risco no app mobile |

---

## 10. Como Executar

### Backend
```bash
cd backend
npm install
node server.js
# Servidor em http://localhost:3000
```

### Banco de dados
Execute o script SQL fornecido separadamente para criar as tabelas no MySQL.

### App (Frontend)
```bash
npm install
npx expo start
```

> **Atenção:** Em [servicos/api.js](servicos/api.js), ajuste `BASE_URL`:
> - Emulador Android: `http://10.0.2.2:3000`
> - Dispositivo físico: `http://<IP-da-máquina>:3000`
