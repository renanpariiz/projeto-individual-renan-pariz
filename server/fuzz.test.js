const { GameCollection } = require('./games.js');
const fc = require('fast-check');

describe('Testes de Fuzzing - Resiliência do Servidor', () => {
    
    test('O método createGame deve aguentar qualquer entrada bizarra sem derrubar o servidor', () => {
        const games = new GameCollection();
        fc.assert(
            fc.property(fc.anything(), (dadosAbsurdos) => {
                expect(() => {
                    games.createGame(dadosAbsurdos);
                }).not.toThrow(); 
            }),
            { numRuns: 100 } 
        );
    });
});