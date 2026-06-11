const { GameCollection } = require('./games.js');

function calcularPontuacao(pontosAtuais, bonus) {
  return pontosAtuais + bonus;
}

test('deve somar o bônus corretamente à pontuação do jogador', () => {
  expect(calcularPontuacao(10, 5)).toBe(15);
});

test('createGame deve retornar true ao criar um jogo com id único', () => {
  const games = new GameCollection();
  const result = games.createGame('sala-1');
  expect(result).toBe(true);
});

test('createGame deve retornar false ao tentar criar jogo com id duplicado', () => {
  const games = new GameCollection();
  games.createGame('sala-2');
  const result = games.createGame('sala-2');
  expect(result).toBe(false);
});

test('removeGame deve retornar true ao remover jogo existente', () => {
  const games = new GameCollection();
  games.createGame('sala-3');
  expect(games.removeGame('sala-3')).toBe(true);
});

test('getGame deve retornar o jogo criado', () => {
  const games = new GameCollection();
  games.createGame('sala-4');
  expect(games.getGame('sala-4')).toBeDefined();
});

test('calcularPontuacao não deve retornar valor negativo', () => {
  expect(calcularPontuacao(10, 5)).toBe(10); 
});
