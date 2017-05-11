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

const db = require('./auth/db');
const Game = require('./model/Game');

const model = new Game();

model.start();

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(model));
        }
        if (ws.player && ws.player.health === 0) {
            const player = ws.player;
            ws.player = undefined;
            db.createRecord(player.login, player.score, (err) => {
                if (err) {
                    console.warn(err);
                }
                ws.close();
            });
        }
    });
}, 30);

wss.on('connection', (ws) => {
    let player = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.method === 'start') {
            player = model.createPlayer(data.src, data.login);
            ws.player = player;
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

db.init();

server.listen(8080, () => {
    console.log('Listening on %d', server.address().port);
});
