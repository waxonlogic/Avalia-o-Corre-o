## AVALIAÇÃO - API

## Funcionalidades

- Cadastrar pedidos
- Listar pedidos
- Consultar pedido por código
- Atualizar situação do pedido
- Remover pedido

## FOI USADO:

- Node.js
- Express

## COMO EXECUTAR:

### INSTALAR AS DEPENDENCIAS

```bash
npm install
```

### EXECUTAR O PROJETO

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