const translate = require('./translate');

const { renderState } = require('./states');

const { delay } = require('./util');

const login = require('./login');
const chooseAvatar = require('./chooseAvatar');

async function main() {
    await translate.init();
    await delay(3000);
    renderState();

    login.init();
    chooseAvatar.init();
}

main();
