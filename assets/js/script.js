function updateClock() {
    const now = new Date();
    
    // Obtém a hora e minutos
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Atualiza o horário no elemento com ID "clock"
    document.getElementById('clock').innerHTML = `${hours}<span class="colon">:</span>${minutes}`;

    // Define o formato da data: dia da semana, dia e mês
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);

    // Atualiza a data no elemento com a classe "date"
    document.querySelector('.date').textContent = formattedDate;
}

// Atualiza o relógio imediatamente e depois a cada minuto
updateClock();
setInterval(updateClock, 60000);

document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("increaseButton");
    let loader = document.querySelector(".loader");
    let lightElement = document.getElementById('light'); // Barra de luz
    let beatDuration = 1; // Frequência inicial da animação (1 segundo)
    let frequencyLevel = 0; // Controle de níveis de frequência
    let lightHeight = 100; // Controle da altura da barra de luz

    // Função para aumentar a frequência (diminuir a duração)
    button.addEventListener("click", function () {
        if (frequencyLevel < 4) { // Agora temos 4 níveis de frequência
            frequencyLevel++;
            beatDuration -= 0.2; // Aumenta a frequência (diminui o tempo de batimento)
            loader.style.animationDuration = `${beatDuration}s`; // Aplica a nova duração

            // Diminui a altura da barra de luz a cada nível de frequência
            lightHeight -= 25; // Diminui 25% a cada aumento de frequência
            lightElement.style.height = `${lightHeight}%`;
        } else {
            // Volta ao ritmo normal após 4 cliques
            beatDuration = 1;
            loader.style.animationDuration = `${beatDuration}s`;

            // Retorna a barra de luz ao topo (100%)
            lightHeight = 100;
            lightElement.style.height = `${lightHeight}%`;

            // Reseta o nível de frequência
            frequencyLevel = 0;
        }
    });
});
