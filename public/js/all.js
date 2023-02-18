function updateDatetime() {
    const timeElement = document.getElementsByClassName('time-content').item(0);
    const dateElement = document.getElementsByClassName('date-content').item(0);
    const secondsHandElement = document.getElementById('secondsHand');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();
    timeElement.innerHTML = date.toLocaleTimeString('de').substring(0, 5);
    dateElement.innerHTML = `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

    const degrees = (date.getSeconds() / 60) * 360;

    secondsHandElement.style.transform = `rotate(${degrees}deg)`;
}


function initSocket(socket) {
    socket.on('lights', (lights) => {
        lights = JSON.parse(lights);
        const lightButtonsContainer = populateLights('#lightsMenu .light-buttons-container', lights);
        const lightButtons = lightButtonsContainer.getElementsByClassName('light-button');
        for (const btn of lightButtons) {
            if (lights[btn.value].state.on) {
                btn.classList.add('on');
            } else {
                btn.classList.remove('on');
            }
        }
    });
}


function initClosePanel(callback, once) {
    document.getElementById('closePanel').addEventListener('click', callback, {once: once});
}


(function() {
    updateDatetime();
    setInterval(updateDatetime, 1000);

    // Initialize panels
    initMenus();

    const socket = io();
    socket.on('connect', () => {
        initSocket(socket);
    });
    
    // Initialize remote
    initRemote('remote', socket);
})();
