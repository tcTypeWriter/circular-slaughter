const { _ } = require('./translate');

const States = {
    LOGIN: 'LOGIN',
    CHOOSE_AVATAR: 'CHOOSE_AVATAR',
    GAME: 'GAME',
    RECORDS: 'RECORDS',
};

const sections = {
    loading: document.getElementById('loading'),
    login: document.getElementById('login'),
    chooseAvatar: document.getElementById('chooseAvatar'),
    game: document.getElementById('game'),
    records: document.getElementById('records'),
};

const header = {
    logo: document.body.querySelector('.logo'),
    lang: document.body.querySelector('.lang'),
    logout: document.body.querySelector('.logout'),
};

const forms = {
    loginForm: sections.login.querySelector('form[name=login-form]'),
    registerForm: sections.login.querySelector('form[name=register-form]'),
};

function renderLogin() {
    const s = sections.login;
    s.style.display = 'flex';

    s.querySelector('.messages').innerHTML = '';

    const { logo, lang, logout } = header;
    logo.textContent = _('Log In');
    lang.style.display = 'inline-block';
    logout.style.display = 'none';

    const { loginForm, registerForm } = forms;

    loginForm.reset();

    loginForm.querySelector('h2')
             .textContent = _('Log In');
    loginForm.querySelector('input[name=login]')
             .setAttribute('placeholder', _('login'));
    loginForm.querySelector('input[name=password]')
             .setAttribute('placeholder', _('password'));
    loginForm.querySelector('button[type=submit]')
             .textContent = _('Go');

    registerForm.reset();

    registerForm.querySelector('h2')
             .textContent = _('Registration');
    registerForm.querySelector('input[name=new-login]')
             .setAttribute('placeholder', _('new login'));
    registerForm.querySelector('input[name=password]')
             .setAttribute('placeholder', _('password'));
    registerForm.querySelector('input[name=repeat-password]')
             .setAttribute('placeholder', _('repeat password'));
    registerForm.querySelector('button[type=submit]')
             .textContent = _('Register');
}

function renderChooseAvatar() {
    const s = sections.chooseAvatar;
    s.style.display = 'flex';

    const { logo, lang, logout } = header;
    logo.textContent = _('Choose avatar');
    lang.style.display = 'inline-block';
    logout.style.display = 'inline-block';
}


let current = States.LOGIN;

function renderState(state) {
    current = state || current;

    Object.values(sections).forEach((s) => { s.style.display = 'none'; });

    switch (current) {
    case States.LOGIN:
        renderLogin();
        break;
    case States.CHOOSE_AVATAR:
        renderChooseAvatar();
        break;
    default:
        console.warn('Bad State on render state');
    }
}


module.exports = {
    States,
    renderState,
    dom: {
        sections,
        header,
        forms,
    },
};
