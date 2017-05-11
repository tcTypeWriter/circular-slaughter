const { directions } = require('../model/constants');

const states = require('./states');
const login = require('./login');
const chooseAvatar = require('./chooseAvatar');
const records = require('./records');

const ctx = document.getElementById('canvas').getContext('2d');

/** @type {WebSocket} */
let ws = null;

function render(model) {
    ctx.clearRect(0, 0, 800, 600);

    model.players.forEach(({ pos, ava, r, _health }) => {
        const img = chooseAvatar.avatars.find(i => i.src.indexOf(ava) >= 0);
        ctx.drawImage(img, pos.x - r, pos.y - r, 2 * r, 2 * r);

        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * (100 - _health) / 100, 0, 2.1 * Math.PI);
        ctx.fill();
    });
}

function start() {
    ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = ({ data: recievedText }) => {
        const data = JSON.parse(recievedText);
        render(data);
    };

    const send = object => ws.send(JSON.stringify(object));
    const move = direction => send({ method: 'move', direction });
    const keys = {
        a: directions.LEFT,
        w: directions.UP,
        d: directions.RIGHT,
        s: directions.DOWN,
    };

    function keyboardHandle(e) {
        if (keys[e.key]) {
            move(keys[e.key]);
        }
    }

    document.addEventListener('keypress', keyboardHandle);

    ws.onclose = () => {
        states.renderState(states.States.RECORDS);
        records.refetch();
        document.removeEventListener('keypress', keyboardHandle);
    };

    const avatar = localStorage.getItem('avatar');

    ws.onopen = () => {
        send({ method: 'start', src: avatar, login: login.session.login });
    };
}

function stop() {
    if (ws) {
        ws.close();
    }
}

exports.start = start;
exports.stop = stop;
