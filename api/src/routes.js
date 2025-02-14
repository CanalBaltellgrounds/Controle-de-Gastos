const express = require('express');
const db = require('./connect.js');

const router = express.Router();

// Rota para listar todos os gastos
router.get('/gastos', (req, res) => {
    const sql = 'SELECT * FROM gastos';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para cadastrar um novo gasto
router.post('/gastos', (req, res) => {
    const { descricao, valor, data } = req.body;
    const sql = 'INSERT INTO gastos (descricao, valor, data) VALUES (?, ?, ?)';
    const params = [descricao, parseFloat(valor).toFixed(2), data];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, descricao, valor, data });
    });
});

// Rota para excluir um gasto
router.delete('/gastos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM gastos WHERE id = ?';

    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Gasto excluído com sucesso!' });
    });
});

module.exports = router;