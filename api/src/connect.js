const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, 'db', 'database.sqlite');

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Criar a tabela de gastos se não existir
        db.run(`
            CREATE TABLE IF NOT EXISTS gastos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao TEXT NOT NULL,
                valor REAL NOT NULL,
                data TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela de gastos:', err.message);
            } else {
                console.log('Tabela de gastos criada ou já existente.');
            }
        });
    }
});

module.exports = db;