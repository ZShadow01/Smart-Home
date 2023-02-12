function initRemote(remoteId, socket) {
    const remote = document.getElementById(remoteId);
    const btn1 = remote.querySelector('button');
    btn1.addEventListener('click', () => {
        if (currentLightButton === null) return;
        socket.emit('light-toggle', currentLightButton.value);
    });
}
