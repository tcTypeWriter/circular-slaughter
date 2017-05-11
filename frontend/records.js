const { _ } = require('./translate');

const {
    dom: {
        sections: { records },
    },
    States,
    renderState,
} = require('./states');

const ws = require('./websocket');

async function refetch() {
    const r = await fetch('/records');
    const data = await r.json();

    records.querySelector('.champion')
           .innerHTML = _('Top: ') + ` <strong>${data[0].score}</strong>[${data[0].login}]`;
    const ol = records.querySelector('ol');
    ol.innerHTML = '';
    data.forEach(({ login, score }) => {
        ol.innerHTML += `<li>${login} <strong>${score}</strong></li>`;
    });
}

function changeAvatar() {
    renderState(States.CHOOSE_AVATAR);
}

function goAgain() {
    renderState(States.GAME);
    ws.start();
}

function init() {
    records.querySelector('.again')
           .addEventListener('click', goAgain);
    records.querySelector('.changeAvatar')
           .addEventListener('click', changeAvatar);
}

exports.init = init;
exports.refetch = refetch;
