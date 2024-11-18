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
    let soundElement = document.getElementById('sound'); // Barra de som
    let notification = document.getElementById('notification'); // Notificação
    let beatDuration = 1; // Frequência inicial da animação (1 segundo)
    let frequencyLevel = 0; // Controle de níveis de frequência
    let lightHeight = 100; // Controle da altura da barra de luz
    let soundHeight = 100; // Controle da altura da barra de som

    // Função para aumentar a frequência (diminuir a duração)
    button.addEventListener("click", function () {
        if (frequencyLevel < 4) { // Limita o número de níveis de frequência
            frequencyLevel++;
            beatDuration -= 0.2; // Aumenta a frequência (diminui o tempo de batimento)
            loader.style.animationDuration = `${beatDuration}s`; // Aplica a nova duração

            // Diminui a altura da barra de luz e barra de som a cada nível de frequência
            lightHeight -= 25; 
            soundHeight -= 25;
            lightElement.style.height = `${lightHeight}%`;
            soundElement.style.height = `${soundHeight}%`;

            // Se as barras atingirem o tamanho mínimo, aguardamos 3 segundos para restaurar as barras e o loader
            if (lightHeight <= 0 && soundHeight <= 0) {
                // Aguarda 3 segundos antes de restaurar o ritmo e as barras
                setTimeout(function() {
                    // Restaura o ritmo normal do coração (loader)
                    loader.style.animationDuration = '1s'; // Ritmo original
                    beatDuration = 1;

                    // Restaura as barras de luz e som para 100% de altura
                    lightElement.style.height = '100%';
                    soundElement.style.height = '100%';

                    // Restaura o nível de frequência
                    frequencyLevel = 0;
                    lightHeight = 100; // Restaura altura da barra de luz
                    soundHeight = 100; // Restaura altura da barra de som
                }, 5000); // Atraso de 3 segundos
            }

        } else {
            // Caso as barras já tenham atingido o nível máximo de diminuição (0%)
            // Volta ao ritmo normal após 4 cliques, caso contrário o código de cima cuida disso
            beatDuration = 1;
            loader.style.animationDuration = `${beatDuration}s`;

            // Retorna a barra de luz e a barra de som ao topo (100%)
            lightHeight = 100;
            soundHeight = 100;
            lightElement.style.height = `${lightHeight}%`;
            soundElement.style.height = `${soundHeight}%`;

            // Reseta o nível de frequência
            frequencyLevel = 0;

           
        }
    });
});
