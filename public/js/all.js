function updateDatetime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
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

        const lightButtonContainer = document.querySelector('.lights-panel .light-button-container');
        lightButtonContainer.innerHTML = '';
        lightButtonContainer.classList.add('hidden');
        
        for (const lightId of Object.keys(lights)) {
            let button = document.createElement('button');
            button.classList.add('light-button');

            button.textContent = lights[lightId].name;
            button.addEventListener('click', () => {
                socket.emit('light-toggle', lightId);
            });

            lightButtonContainer.appendChild(button);
        }
    });
}


(function() {
    updateDatetime();
    setInterval(updateDatetime, 1000);

    const panelContainers = document.getElementsByClassName('panel-container');
    for (const panel of panelContainers) {
        panel.addEventListener('click', () => {
            panel.classList.add('active');
        });
    }
    
    const closePanel = document.getElementById('closePanel');
    closePanel.addEventListener('click', () => {
        const active = document.querySelector('.panel-container.active');
        if (active) {
            active.classList.remove('active');
        }
    });




    const socket = io();
    socket.on('connect', () => {
        initSocket(socket);
    });
})();
