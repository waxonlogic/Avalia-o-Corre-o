const express = require('express');
const router = express.Router();

const pedidosController = require('../controllers/pedidosController');

router.post('/pedidos', pedidosController.cadastrar);

router.get('/pedidos', pedidosController.listar);

router.get('/pedidos/:codigo', pedidosController.consultar);

router.put('/pedidos/:codigo', pedidosController.atualizar);

router.delete('/pedidos/:codigo', pedidosController.remover);

module.exports = router;