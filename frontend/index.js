const { initTranslate } = require('./translate');

const { renderState } = require('./states');

const { delay } = require('./util');

async function main() {
    await initTranslate();
    await delay(3000);
    renderState();
    require('./login')();
}

main();
