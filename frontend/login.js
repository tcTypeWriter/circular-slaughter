const { _ } = require('./translate');
const ws = require('./websocket');
const {
    States,
    renderState,
    dom: {
        sections,
        header: { logout },
        forms: { loginForm, registerForm },
    },
} = require('./states');

const session = {};
const messages = sections.login.querySelector('.messages');

const headers = new Headers();
headers.append('Content-Type', 'application/json');

async function handleLogin(e) {
    e.preventDefault();
    const login = loginForm.login.value;
    const password = loginForm.password.value;

    const button = loginForm.querySelector('button[type=submit]');

    button.setAttribute('disabled', 'disabled');
    const r = await fetch('/session/current', {
        method: 'POST',
        headers,
        body: JSON.stringify({ login, password }),
        credentials: 'include',
    });
    const data = await r.json();

    button.removeAttribute('disabled');

    if (data.type === 'error') {
        messages.innerHTML = `<div class='failure'>${_(data.message)}</div>`;
        return;
    }

    Object.assign(session, data);

    renderState(States.CHOOSE_AVATAR);
}

async function registrationHandle(e) {
    e.preventDefault();
    const login = registerForm['new-login'].value;
    const password = registerForm.password.value;
    const rPassword = registerForm['repeat-password'].value;

    const button = registerForm.querySelector('button[type=submit]');

    if (password !== rPassword) {
        messages.innerHTML = `<div class='failure'>${_('password do not match')}</div>`;
        return;
    }

    button.setAttribute('disabled', 'disabled');

    const r = await fetch('/session', {
        method: 'POST',
        headers,
        body: JSON.stringify({ login, password }),
    });
    const data = await r.json();

    button.removeAttribute('disabled');

    if (data.type === 'error') {
        messages.innerHTML = `<div class='failure'>${_(data.message)}</div>`;
        return;
    }
    messages.innerHTML = `<div class='success'>${_('User created')}</div>`;
    registerForm.reset();
}

async function logoutHandle() {
    await fetch('/session/current', {
        method: 'DELETE',
        credentials: 'include',
    });
    ws.stop();
    renderState(States.LOGIN);
}

async function check() {
    const r = await fetch('/session/current', {
        method: 'GET',
        credentials: 'include',
    });
    const data = await r.json();

    if (data.type === 'error') {
        return;
    }

    Object.assign(session, data);

    renderState(States.CHOOSE_AVATAR);
}

function init() {
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', registrationHandle);
    logout.addEventListener('click', logoutHandle);
    check();
}

exports.init = init;
exports.session = session;
