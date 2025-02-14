const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let gastos = [];
let idCounter = 1;

// Rota para listar todos os gastos
app.get('/gastos', (req, res) => {
    res.json(gastos);
});

// Rota para cadastrar um novo gasto
app.post('/gastos', (req, res) => {
    const { descricao, valor, data } = req.body;
    const novoGasto = {
        id: idCounter++,
        descricao,
        valor: parseFloat(valor).toFixed(2),
        data
    };
    gastos.push(novoGasto);
    res.status(201).json(novoGasto);
});

// Rota para excluir um gasto
app.delete('/gastos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    gastos = gastos.filter(gasto => gasto.id !== id);
    res.status(200).json({ message: 'Gasto excluído com sucesso!' });
});

// Iniciar o servidor
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});