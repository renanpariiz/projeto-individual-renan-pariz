const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { Pool } = require('pg');
const { GameCollection } = require('./games.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// =============================================================
// Fase 2 - Persistência com PostgreSQL
// Salva histórico de partidas no banco de dados
// =============================================================
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS match_history (
      id        SERIAL PRIMARY KEY,
      player1   VARCHAR(50),
      player2   VARCHAR(50),
      winner    VARCHAR(50),
      played_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Banco de dados inicializado.');
}

// Serve o frontend estático
app.use(express.static(path.join(__dirname, '..', 'game')));

// Rota para listar histórico de partidas
app.get('/api/matches', async (req, res) => {
  const result = await pool.query('SELECT * FROM match_history ORDER BY played_at DESC LIMIT 20');
  res.json(result.rows);
});

// Lógica de websocket / jogo
const games = new GameCollection();

io.on('connection', (socket) => {
  console.log(`Jogador conectado: ${socket.id}`);

  socket.on('join', async (gameId) => {
    const joined = games.createGame(gameId);
    if (!joined) {
      // partida terminou - registra no banco
      await pool.query(
        'INSERT INTO match_history (player1, player2) VALUES ($1, $2)',
        [gameId, socket.id]
      );
    }
    socket.join(gameId);
  });

  socket.on('disconnect', () => {
    console.log(`Jogador desconectado: ${socket.id}`);
  });
});

// Inicializa banco e sobe o servidor
initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar ao banco:', err);
  process.exit(1);
});
