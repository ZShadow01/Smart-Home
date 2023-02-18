// Socket.io
async function convertLightToJSON(lights) {
    let json = {}
    for (const lightId of Object.keys(lights)) {
        json[lightId] = await lights[lightId].json();
    }
    return json;
}


function initConnection(io, bridge) {
    io.on('connection', async (socket) => {
        const lights = await bridge.getLights();

        socket.emit('lights', JSON.stringify(await convertLightToJSON(lights)));

        socket.on('light-toggle', async (lightId) => {
            await lights[lightId].toggle();
            socket.emit('lights', JSON.stringify(await convertLightToJSON(lights)));
        });
    });
}


module.exports = initConnection;
