// Socket.io
function initConnection(io, bridge) {
    io.on('connection', async (socket) => {
        const lights = await bridge.getLights();
        let lightsJSON = structuredClone(lights);
        for (const lightId of Object.keys(lights)) {
            lightsJSON[lightId] = lights[lightId].json();
        }
        socket.emit('lights', JSON.stringify(lightsJSON));

        socket.on('light-toggle', async (lightId) => {
            await lights[lightId].toggle();
        });
    });
}


module.exports = initConnection;
