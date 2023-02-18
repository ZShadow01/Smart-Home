const MENU_OPTIONS_RADIUS = 270;
const MENUS = {
    mainMenu: {
        show: null,
        hide: null
    }
};
const menuList = ['mainMenu'];


function getCurrentMenuId() {
    return menuList[menuList.length - 1];
}


function initializeMenus() {
    // Initialize "go back" buttons
    const prevMenuButtons = document.getElementsByClassName('prev-menu');
    for (const btn of prevMenuButtons) {
        btn.addEventListener('click', () => {
            const currentMenuId = menuList.pop();
            const prevMenuId = getCurrentMenuId();

            const currentMenu = document.getElementById(currentMenuId);
            const prevMenu = document.getElementById(prevMenuId);
            
            currentMenu.classList.remove('active');
            prevMenu.classList.add('active');

            hideMenu(currentMenuId);
            showMenu(prevMenuId);
        });
    }

    // Initialize "next" buttons
    const nextMenuButtons = document.getElementsByClassName('next-menu');
    for (const btn of nextMenuButtons) {
        btn.addEventListener('click', () => {
            const prevMenuId = getCurrentMenuId();
            const nextMenuId = btn.value;
    
            const prevMenu = document.getElementById(prevMenuId);
            const nextMenu = document.getElementById(nextMenuId);
    
            menuList.push(nextMenuId);
    
            prevMenu.classList.remove('active');
            nextMenu.classList.add('active');
    
            hideMenu(prevMenuId);
            showMenu(nextMenuId);
        });
    }
}


function showMenu(menuId) {
    const menuObj = MENUS[menuId];
    if (menuObj.show) {
        MENUS[menuId].show();
    }
    if (menuObj.clearCenter) {
        moveDateTimeClock();
    }
    initMenuOptions(menuId);
}


function hideMenu(menuId) {
    const menuObj = MENUS[menuId];
    if (menuObj.hide) {
        MENUS[menuId].hide();
    }
    if (menuObj.clearCenter) {
        resetDateTimeClock();
    }
}


function initMenuOptions(menuId) {
    const menu = document.getElementById(menuId);
    const menuOptions = menu.getElementsByClassName('menu-option');

    const interval = 360 / menuOptions.length;
    for (let i = 0; i < menuOptions.length; i++) {
        const deg = interval * i;
        const x = Math.round(Math.sin(deg * (Math.PI / 180)) * MENU_OPTIONS_RADIUS);
        const y = Math.round(Math.cos(deg * (Math.PI / 180)) * MENU_OPTIONS_RADIUS);
        const option = menuOptions.item(i);

        option.style.transform = `translate(calc(${x}px - 50%), calc(${-y}px - 50%))`;
    }
}


function moveDateTimeClock() {
    document.querySelector('.date-time-container').classList.remove('initial');
}


function resetDateTimeClock() {
    document.querySelector('.date-time-container').classList.add('initial');
}