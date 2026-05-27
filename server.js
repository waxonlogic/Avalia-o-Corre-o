const express = require('express');
const app = express();

const pedidosRoutes = require('./routes/pedidosRoutes');

app.use(express.json());

app.use('/', pedidosRoutes);

app.listen(3000, function() {
    console.log("Servidor está rodando");
});