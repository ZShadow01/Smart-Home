// INCLUDE
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const Bridge = require('./scripts/bridge.js');
const initConnection = require('./scripts/connection.js');


// CONFIG
const PORT = process.env.PORT || 80;


// INIT
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let bridge;

const routers = fs.readdirSync('./routers');

app.use('/', express.static('./public'));

for (const router of routers) {
    let r = require(`./routers/${router}`);
    app.use(r.route, r.data);
}


server.listen(PORT, async () => {
    console.log("Server is listening");
    
    bridge = new Bridge('192.168.2.30', '--QNE8y1eEyHXn6zZVv7M2fPDSXuuNsygLHQVpvk');
    await bridge.init();

    initConnection(io, bridge);
});

