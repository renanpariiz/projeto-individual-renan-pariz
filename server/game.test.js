// Função simulada que deveria somar pontos do jogador
/* function calcularPontuacao(pontosAtuais, bonus) {
    // Simulando um bug de código: esqueci de somar o bônus!
    return pontosAtuais; 
}

test('Deve somar o bônus corretamente à pontuação do jogador', () => {
    // Se o jogador tem 10 pontos e ganha 5 de bônus, deveria ser 15
    expect(calcularPontuacao(10, 5)).toBe(15); 
}); */

// Função corrigida
function calcularPontuacao(pontosAtuais, bonus) {
    return pontosAtuais + bonus; // <-- Correção aqui!
}

test('Deve somar o bônus corretamente à pontuação do jogador', () => {
    expect(calcularPontuacao(10, 5)).toBe(15); 
});