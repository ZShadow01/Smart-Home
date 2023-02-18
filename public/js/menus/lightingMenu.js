const lightingMenuId = 'lightingMenu';
let currentLightButton = null;

MENUS.lightingMenu = {
    show: () => {
        moveDateTimeClock();
        initClosePanel(resetLightButtonStates, false);
    },
    hide: () => {
        resetLightButtonStates();
        closePanel.removeEventListener('click', resetLightButtonStates);
        resetDateTimeClock();
    }
};


function resetLightButtonStates() {
    const lightButtonContainer = document.querySelector(`#${lightingMenuId} .light-buttons-container`);
    currentLightButton = null;
    const active = lightButtonContainer.getElementsByClassName('active');
    for (const i of active) {
        i.classList.remove('active');
    }
}


function populateLights(selector, lights) {
    const lightButtonContainer = document.querySelector(selector);
    if (lightButtonContainer.getElementsByClassName('light-button').length) {
        return lightButtonContainer;
    }
    
    for (const lightId of Object.keys(lights)) {
        let button = document.createElement('button');
        button.classList.add('light-button');
        button.classList.add('menu-option');
        button.classList.add('rainbow-border');
        button.classList.add('no-select');

        button.textContent = lights[lightId].name;
        button.value = lightId;
        button.addEventListener('click', () => {
            if (currentLightButton !== null) {
                currentLightButton.classList.remove('active');
            }
            button.classList.add('active');
            currentLightButton = button;
        });

        lightButtonContainer.appendChild(button);
    }
    return lightButtonContainer;
}
