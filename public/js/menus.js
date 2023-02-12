const MENU_OPTIONS_RADIUS = 270;
const menuList = ['mainMenu'];
const MENUS = {
    lightsMenu: {init: switchLightsMenu, destroy: resetLightsMenu}
};


function getCurrentMenuId() {
    return menuList[menuList.length - 1];
}


function initMenus() {
    // Initialize main menu
    const mainMenu = document.getElementById('mainMenu');
    let menuOptions = mainMenu.getElementsByClassName('menu-option');
    if (!menuOptions) {
        return;
    }

    initMenuOptions(menuOptions);

    menuOptions = mainMenu.getElementsByClassName('next-menu');
    initMenu(menuOptions);
}


function initMenu(menuOptions) {
    for (let i = 0; i < menuOptions.length; i++) {
        const menuOption = menuOptions.item(i);
        menuOption.addEventListener('click', () => {
            const currentMenu = document.getElementById(getCurrentMenuId());
            const nextMenuId = menuOption.value;

            if (!nextMenuId) return;

            const nextMenu = document.getElementById(nextMenuId);
            menuList.push(nextMenuId);

            currentMenu.classList.remove('active');
            nextMenu.classList.add('active');

            if (MENUS[currentMenu.id]) MENUS[currentMenu.id].destroy();
            MENUS[nextMenuId].init();

            document.querySelector('.date-time-container').classList.remove('initial');
        });
    }

    const prevMenuButtons = document.getElementsByClassName('prev-menu');
    for (const prevMenuButton of prevMenuButtons) {
        prevMenuButton.addEventListener('click', () => {
            if (menuList.length <= 1) return;

            const currentMenu = document.getElementById(getCurrentMenuId());
            const prevMenu = document.getElementById(menuList[menuList.length - 2]);

            menuList.pop();

            currentMenu.classList.remove('active');
            prevMenu.classList.add('active');

            if (MENUS[currentMenu.id]) MENUS[currentMenu.id].destroy();
            
            if (menuList.length == 1) {
                document.querySelector('.date-time-container').classList.add('initial');
            }
        });
    }
}


function initMenuOptions(options) {
    const interval = 360 / options.length;
    for (let i = 0; i < options.length; i++) {
        const deg = interval * i;
        const x = Math.round(Math.sin(deg * (Math.PI / 180)) * MENU_OPTIONS_RADIUS);
        const y = Math.round(Math.cos(deg * (Math.PI / 180)) * MENU_OPTIONS_RADIUS);
        const option = options.item(i);

        option.style.transform = `translate(calc(${x}px - 50%), calc(${-y}px - 50%))`;
    }
}
