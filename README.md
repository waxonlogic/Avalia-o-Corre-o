# API de Pedidos

Projeto desenvolvido em Node.js utilizando Express para gerenciamento de pedidos.

## Funcionalidades

- Cadastrar pedidos
- Listar pedidos
- Consultar pedido por código
- Atualizar situação do pedido
- Remover pedido

## Tecnologias

- Node.js
- Express

## Como executar

### Instalar dependências

```bash
npm install
```

### Executar o projeto

```bash
node app.js
```

Servidor executa em:

```txt
http://localhost:3000
```

---

# Rotas da API

## Criar pedido

POST /pedidos

### Exemplo body

```json
{
  "clienteCPF": "12345678900",
  "clienteNome": "João Silva",
  "produtoNome": "Notebook Dell",
  "produtoPreco": 3500
}
```

---

## Listar pedidos

GET /pedidos

---

## Consultar pedido

GET /pedidos/1

---

## Atualizar situação

PUT /pedidos/1

### Body

```json
{
  "situacao": "pago"
}
```

---

## Remover pedido

DELETE /pedidos/1