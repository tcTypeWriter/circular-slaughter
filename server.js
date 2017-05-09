const path = require('path');
const http = require('http');

const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { auth } = require('./auth');

const app = express();
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', auth);

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server,
    backlog: 15,
    clientTracking: true,
    verifyClient: ({ req }) => true,
});

const Game = require('./model/Game');

const model = new Game();

model.start();

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(model));
        }
    });
}, 30);

wss.on('connection', (ws) => {
    let player = null;
    console.log('connect ', ws);
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.method === 'start') {
            player = model.createPlayer(data.src);
        } else if (data.method === 'move') {
            player.move(data.direction);
        }
    });

    ws.on('error', (err) => {
        console.warn(err);
        ws.close();
    });

    ws.on('close', () => {
        model.players = model.players.filter(p => p !== player);
    });
});

const db = require('./auth/db');

db.init();

server.listen(8080, () => {
    console.log('Listening on %d', server.address().port);
});
