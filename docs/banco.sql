CREATE DATABASE gastos;
USE gastos;

CREATE TABLE gastos(
    gasto_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    data DATE NOT NULL,
    valor decimal(10,2) NOT NULL,
    descrição VARCHAR(255) NOT NULL
);