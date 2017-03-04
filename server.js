const path = require('path');
const http = require('http');

const express = require('express');
const WebSocket = require('ws');


const WIDTH = 800;
const HEIGHT = 600;
const STEP = 5;

const model = {
    points: []
};

const app = express();
app.use(express.static(path.join(__dirname, 'html')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
    const id = model.points.length;
    model.points.push({ x: 0, y: 0 });

    ws.on('message', function (message) {
        const data = JSON.parse(message);
        if (data.method === 'move') {
            const point = model.points[id];
            const moves = {
                'left': () => point.x = (WIDTH + point.x - STEP) % WIDTH,
                'right': () => point.x = (WIDTH + point.x + STEP) % WIDTH,
                'up': () => point.y = (HEIGHT + point.y - STEP) % HEIGHT,
                'down': () => point.y = (HEIGHT + point.y + STEP) % HEIGHT,
            };
            moves[data.direction] && moves[data.direction]();
            sendModel();
        }
    });

    function sendModel() {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ points: model.points }));
            }
        });
    }

    ws.send(JSON.stringify({ id }));
    sendModel();
});

server.listen(8080, function () {
    console.log('Listening on %d', server.address().port);
});