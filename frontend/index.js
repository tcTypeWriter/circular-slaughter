const translate = require('./translate');

const { renderState } = require('./states');

const { delay } = require('./util');

const login = require('./login');
const chooseAvatar = require('./chooseAvatar');
const records = require('./records');


async function main() {
    await translate.init();
    await delay(1500 + Math.random() * 1500);
    renderState();

    login.init();
    chooseAvatar.init();
    records.init();
}

main();
