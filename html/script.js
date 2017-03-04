let model = {};

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = ({ data: recievedText }) => {
    const data = JSON.parse(recievedText);
    model = Object.assign(model, data);
    renderData(model);
};

function renderData(data) {
    const { points, id } = data;
    const ctx = document.getElementById('canvas').getContext('2d');
    
    ctx.clearRect(0, 0, 800, 600);
    
    points.forEach((point, i) => {
        ctx.fillStyle = i === id ? 'red' : 'blue';
        ctx.fillRect(point.x, point.y, 20, 20);
    });
}


const send = (object) => ws.send(JSON.stringify(object));
const move = (direction) => send({ method: 'move', direction });
const keys = {
    'ArrowLeft': 'left',
    'ArrowUp': 'up',
    'ArrowRight': 'right',
    'ArrowDown': 'down',
}

document.addEventListener('keypress', function (e) {
    if (keys[e.key])
        move(keys[e.key]);
});