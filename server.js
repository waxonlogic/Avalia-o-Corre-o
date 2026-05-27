const express = require('express');
const app = express();

app.use(express.json());

// memória
let pedidos = [];
let proximoCodigo = 1;


// CRUD - GET, POST, PUT, DELETE
// ------------------ POST ------------------------------------------------
app.post("/pedidos", function(req, res){        // cadastrar
    const { clienteCPF, clienteNome, produtoNome, produtoPreco } = req.body;

    if (!clienteCPF) {                              // CPF do cliente é obrigatório
        return res.status(400).json({
            erro: "CPF do cliente é obrigatório"
        });
    }

    if (!clienteNome) {                             // nome do cliente é obrigatório
        return res.status(400).json({
            erro: "Nome do cliente é obrigatório"
        });
    }

    if (clienteNome.length < 5) {                   // nome do cliente mínimo 5 caracteres
        return res.status(400).json({
            erro: "Nome do cliente deve ter pelo menos 5 caracteres"
        });
    }

    if (!produtoNome) {                             // nome do produto é obrigatório
        return res.status(400).json({
            erro: "Nome do produto é obrigatório"
        });
    }

    if (produtoNome.length < 5) {                   // nome do produto mínimo 5 caracteres
        return res.status(400).json({
            erro: "Nome do produto deve ter pelo menos 5 caracteres"
        });
    }

    if (produtoPreco === undefined || produtoPreco === null) {      // Preço é obrigatório
        return res.status(400).json({
            erro: "Preço do produto é obrigatório"
        });
    }

    if (typeof produtoPreco !== "number" || produtoPreco <= 0) {    // Preço tem que ser positivo
        return res.status(400).json({
            erro: "Preço do produto deve ser um número positivo"
        });
    }

    const novoPedido = {
        codigo: proximoCodigo,
        dataHora: new Date(),
        clienteCPF,
        clienteNome,
        produtoNome,
        produtoPreco,
        situacao: "aberto"
    };

    pedidos.push(novoPedido);
    proximoCodigo++;

    return res.status(201).json({
        mensagem: "Pedido cadastrado com sucesso!",
        pedido: novoPedido
    });
});
// -------------------------------------------------------------------


// -----------  GET  ---------------------------------
app.get("/pedidos", function(req, res){        
    const { situacao } = req.query;

    if (situacao) {
        if (situacao !== "aberto" && situacao !== "pago" && situacao !== "finalizado") {   // situacoes que foram solicitadas
            return res.status(400).json({
                erro: "Situação deve ser aberto, pago ou finalizado"
            });
        }
    }

    let listaPedidos = pedidos;

    if (situacao) {      // com filtro na url da pra usar /pedidos?=(situação)
        listaPedidos = pedidos.filter(function(pedido) {
            return pedido.situacao === situacao;
        });
    }

    const pedidosListados = listaPedidos.map(function(pedido) { 
        return {
            codigo: pedido.codigo,
            dataHora: pedido.dataHora,
            clienteNome: pedido.clienteNome,
            produtoNome: pedido.produtoNome,
            situacao: pedido.situacao,
            valorTotal: pedido.produtoPreco
        };
    });

    res.status(200).json(pedidosListados);
});
// ------------------------------------------------------------



// ---------------- GET para consulta ------------------------------------
app.get("/pedidos/:codigo", function(req, res){
    const codigo = Number(req.params.codigo);   // o codigo que veio no parâmetro da URL

    if (isNaN(codigo)) {                       // codigo deve ser número
        return res.status(400).json({
            erro: "Código do pedido deve ser um número"
        });
    }

    const pedido = pedidos.find(function(pedido){   // procura o pedido pelo código
        return pedido.codigo === codigo;
    });

    if (!pedido) {                          
        return res.status(404).json({
            erro: "Pedido não encontrado"
        });
    }

    return res.status(200).json({
        codigo: pedido.codigo,
        dataHora: pedido.dataHora,
        clienteCPF: pedido.clienteCPF,
        clienteNome: pedido.clienteNome,
        produtoNome: pedido.produtoNome,
        situacao: pedido.situacao,
        valorTotal: pedido.produtoPreco
    });
});
// ---------------------------------------------------------------------

// ---------------- PUT ------------------------------------
app.put("/pedidos/:codigo", function(req, res){         // atualizar o pediod
    const codigo = Number(req.params.codigo);
    const { situacao } = req.body;

    if (isNaN(codigo)) {                // codigo deve ser número
        return res.status(400).json({
            erro: "Código do pedido deve ser um número"
        });
    }

    if (!situacao) {                            // situação é obrigatória
        return res.status(400).json({
            erro: "Situação do pedido é obrigatória"
        });
    }

    if (situacao !== "aberto" && situacao !== "pago" && situacao !== "finalizado") {  // a situacao tem que ser uma dessas
        return res.status(400).json({
            erro: "Situação deve ser aberto, pago ou finalizado"
        });
    }

    const pedido = pedidos.find(function(pedido){   // procura o pedido pelo código
        return pedido.codigo === codigo;
    });

    if (!pedido) {                             
        return res.status(404).json({
            erro: "Pedido não encontrado"
        });
    }

    pedido.situacao = situacao;                 // atualiza a situação do pedido

    return res.status(200).json({
        mensagem: "Situação do pedido atualizada com sucesso!",
        pedido: pedido
    });
});
// -------------------------------------------------------------------



// ---------------- DELETE ------------------------------------
app.delete("/pedidos/:codigo", function(req, res){       // deletar/excliur pedido
    const codigo = Number(req.params.codigo);

    if (isNaN(codigo)) {                // codigo deve ser número
        return res.status(400).json({
            erro: "Código do pedido deve ser um número"
        });
    }

    const posicaoPedido = pedidos.findIndex(function(pedido){   // procura a posição do pedido
        return pedido.codigo === codigo;
    });

    if (posicaoPedido === -1) {                 
        return res.status(404).json({
            erro: "Pedido não encontrado"
        });
    }

    const pedidoRemovido = pedidos.splice(posicaoPedido, 1);    // remove o pedido da lista

    return res.status(200).json({
        mensagem: "Pedido removido com sucesso!",
        pedido: pedidoRemovido[0]
    });
});
// ------------------------------------------------------------



app.listen(3000, function() {
    console.log("Servidor está rodando");
});