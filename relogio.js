// Verificar se há uma hora alvo armazenada no localStorage
let targetTimeString = localStorage.getItem('targetTime');
let targetTime;

if (targetTimeString) {
    targetTime = new Date(targetTimeString);
} else {
    // Se não houver hora alvo armazenada, calcular a hora alvo inicial
    targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 6);
    targetTime.setMinutes(targetTime.getMinutes() + 24);
    targetTime.setSeconds(targetTime.getSeconds() + 33);
}

function update() {
    let currentTime = new Date();
    let diff = targetTime - currentTime;
    if (diff > 0) {
        let hours = setTwoDigit(Math.floor(diff / 60 / 60 / 1000) % 24);
        let min = setTwoDigit(Math.floor(diff / 60 / 1000) % 60);
        let sec = setTwoDigit(Math.floor(diff / 1000) % 60);
        document.querySelector('#hours').innerText = hours;
        document.querySelector('#min').innerText = min;
        document.querySelector('#sec').innerText = sec;
    } else {
        clearInterval(interval);
        document.querySelector('body').classList.add('alert');
    }
}

// Iniciar a contagem regressiva
let interval = setInterval(update, 1000);

// Função auxiliar para adicionar um zero à esquerda para números menores que 10
function setTwoDigit(argument) {
    return argument > 9 ? argument : '0' + argument;
}

// Armazenar a hora alvo no localStorage
localStorage.setItem('targetTime', targetTime.toString());

// Chamar update() uma vez quando o script é carregado para atualizar imediatamente o relógio
update();


