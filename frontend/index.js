const { initTranslate, _ } = require('./translate');

const sections = {
    login: document.getElementById('login'),
    chooseAvatar: document.getElementById('chooseAvatar'),
    game: document.getElementById('game'),
    records: document.getElementById('records'),
};

async function main() {
    await initTranslate();

    console.log(_('Hello, world'));
}

main();
