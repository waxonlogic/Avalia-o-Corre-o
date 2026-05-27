const pedidosService = require('../services/pedidosService');

function cadastrar(req, res) {

    try {

        const resultado = pedidosService.cadastrar(req.body);

        return res.status(201).json(resultado);

    } catch (erro) {

        return res.status(400).json({
            erro: erro.message
        });
    }
}

function listar(req, res) {

    try {

        const resultado = pedidosService.listar(req.query.situacao);

        return res.status(200).json(resultado);

    } catch (erro) {

        return res.status(400).json({
            erro: erro.message
        });
    }
}

function consultar(req, res) {

    try {

        const codigo = Number(req.params.codigo);

        const resultado = pedidosService.consultar(codigo);

        return res.status(200).json(resultado);

    } catch (erro) {

        return res.status(404).json({
            erro: erro.message
        });
    }
}

function atualizar(req, res) {

    try {

        const codigo = Number(req.params.codigo);

        const resultado = pedidosService.atualizar(
            codigo,
            req.body.situacao
        );

        return res.status(200).json({
            mensagem: "Situação atualizada com sucesso!",
            pedido: resultado
        });

    } catch (erro) {

        return res.status(400).json({
            erro: erro.message
        });
    }
}

function remover(req, res) {

    try {

        const codigo = Number(req.params.codigo);

        const resultado = pedidosService.remover(codigo);

        return res.status(200).json({
            mensagem: "Pedido removido com sucesso!",
            pedido: resultado
        });

    } catch (erro) {

        return res.status(404).json({
            erro: erro.message
        });
    }
}

module.exports = {
    cadastrar,
    listar,
    consultar,
    atualizar,
    remover
};