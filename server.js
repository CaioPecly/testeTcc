const express = require('express');
const mysql = require('mysql2');
const path = require('path');  // Para resolver o caminho dos arquivos
const app = express();
const port = 3000;

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',  // ou o seu host
  user: 'root',       // seu usuário do MySQL
  password: '',       // sua senha do MySQL
  database: 'quiz'    // nome do banco de dados
});

// Conectando ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Middleware para servir arquivos estáticos diretamente da raiz do projeto
app.use(express.static(path.join(__dirname))); // Agora ele vai procurar os arquivos na raiz

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Serve o index.html da raiz
});

// Rota para obter as perguntas do banco de dados
app.get('/api/questions', (req, res) => {
  db.query('SELECT * FROM questions', (err, results) => {
    if (err) {
      console.error('Erro ao obter perguntas:', err);
      res.status(500).send('Erro ao obter perguntas');
    } else {
      res.json(results);
    }
  });
});

// Iniciar o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
