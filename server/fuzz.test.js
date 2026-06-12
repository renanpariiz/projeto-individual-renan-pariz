const { GameCollection } = require('./games.js');
const fc = require('fast-check');

describe('Testes de Fuzzing - Resiliência do Servidor', () => {

  test('createGame deve aguentar qualquer entrada sem derrubar o servidor', () => {
    const games = new GameCollection();
    fc.assert(
      fc.property(fc.anything(), (entrada) => {
        expect(() => {
          games.createGame(entrada);
        }).not.toThrow();
      }),
      { numRuns: 100 }
    );
  });

  test('removeGame deve aguentar qualquer entrada sem derrubar o servidor', () => {
    const games = new GameCollection();
    fc.assert(
      fc.property(fc.anything(), (entrada) => {
        expect(() => {
          games.removeGame(entrada);
        }).not.toThrow();
      }),
      { numRuns: 100 }
    );
  });

  test('getGame deve aguentar qualquer entrada sem derrubar o servidor', () => {
    const games = new GameCollection();
    fc.assert(
      fc.property(fc.anything(), (entrada) => {
        expect(() => {
          games.getGame(entrada);
        }).not.toThrow();
      }),
      { numRuns: 100 }
    );
  });

  test('sequência aleatória de operações não deve corromper o estado', () => {
    fc.assert(
      fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 20 }), (ids) => {
        const games = new GameCollection();
        expect(() => {
          ids.forEach(id => {
            games.createGame(id);
            games.getGame(id);
            games.removeGame(id);
          });
        }).not.toThrow();
      }),
      { numRuns: 50 }
    );
  });

});