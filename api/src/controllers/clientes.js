const express = require('express');
const db = require('./connect.js');

const router = express.Router();

// Rota para listar todos os clientes
router.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para cadastrar um novo cliente
router.post('/clientes', (req, res) => {
    const { nome, cpf, nascimento } = req.body;
    const sql = 'INSERT INTO clientes (nome, cpf, nascimento) VALUES (?, ?, ?)';
    const params = [nome, cpf, nascimento];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, nome, cpf, nascimento });
    });
});

// Rota para editar um cliente
router.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const { nome, cpf, nascimento } = req.body;
    const sql = 'UPDATE clientes SET nome = ?, cpf = ?, nascimento = ? WHERE id = ?';
    const params = [nome, cpf, nascimento, id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    });
});

// Rota para excluir um cliente
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM clientes WHERE id = ?';

    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    });
});

module.exports = router;