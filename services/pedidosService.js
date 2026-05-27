let pedidos = [];
let proximoCodigo = 1;

function cadastrar(dados) {

    const { clienteCPF, clienteNome, produtoNome, produtoPreco } = dados;

    if (!clienteCPF) {
        throw new Error("CPF do cliente é obrigatório");
    }

    if (!clienteNome) {
        throw new Error("Nome do cliente é obrigatório");
    }

    if (clienteNome.length < 5) {
        throw new Error("Nome do cliente deve ter pelo menos 5 caracteres");
    }

    if (!produtoNome) {
        throw new Error("Nome do produto é obrigatório");
    }

    if (produtoNome.length < 5) {
        throw new Error("Nome do produto deve ter pelo menos 5 caracteres");
    }

    if (produtoPreco === undefined || produtoPreco === null) {
        throw new Error("Preço do produto é obrigatório");
    }

    if (typeof produtoPreco !== "number" || produtoPreco <= 0) {
        throw new Error("Preço do produto deve ser um número positivo");
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

    return {
        mensagem: "Pedido cadastrado com sucesso!",
        pedido: novoPedido
    };
}

function listar(situacao) {

    let listaPedidos = pedidos;

    if (situacao) {

        if (
            situacao !== "aberto" &&
            situacao !== "pago" &&
            situacao !== "finalizado"
        ) {
            throw new Error("Situação deve ser aberto, pago ou finalizado");
        }

        listaPedidos = pedidos.filter(function(pedido) {
            return pedido.situacao === situacao;
        });
    }

    return listaPedidos.map(function(pedido) {
        return {
            codigo: pedido.codigo,
            dataHora: pedido.dataHora,
            clienteNome: pedido.clienteNome,
            produtoNome: pedido.produtoNome,
            situacao: pedido.situacao,
            valorTotal: pedido.produtoPreco
        };
    });
}

function consultar(codigo) {

    const pedido = pedidos.find(function(pedido) {
        return pedido.codigo === codigo;
    });

    if (!pedido) {
        throw new Error("Pedido não encontrado");
    }

    return pedido;
}

function atualizar(codigo, situacao) {

    const pedido = pedidos.find(function(pedido) {
        return pedido.codigo === codigo;
    });

    if (!pedido) {
        throw new Error("Pedido não encontrado");
    }

    pedido.situacao = situacao;

    return pedido;
}

function remover(codigo) {

    const posicaoPedido = pedidos.findIndex(function(pedido) {
        return pedido.codigo === codigo;
    });

    if (posicaoPedido === -1) {
        throw new Error("Pedido não encontrado");
    }

    return pedidos.splice(posicaoPedido, 1)[0];
}

module.exports = {
    cadastrar,
    listar,
    consultar,
    atualizar,
    remover
};