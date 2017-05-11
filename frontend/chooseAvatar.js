const {
    dom: {
        forms: { chooseAvatarForm },
        sections: { chooseAvatar },
    },
    renderState,
    States,
} = require('./states');

const { shuffle } = require('./util');

const ws = require('./websocket');

const avatars = [
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png',
    'img/8.png',
    'img/9.png',
    'img/10.png',
    'img/11.png',
    'img/12.png',
];

const avatarsWrapper = chooseAvatar.querySelector('.avatars');

const button = chooseAvatar.querySelector('button[type=submit]');
button.setAttribute('disabled', 'disabled');

function renderRadio() {
    const avatar = localStorage.getItem('avatar');

    shuffle(avatars).forEach((src) => {
        avatarsWrapper.innerHTML += `
            <input id="a-${src}" type="radio" name="avatar" value="${src}" ${src === avatar ? 'checked' : ''} />
            <label for="a-${src}" class="avatar"><img src="${src}" /></label>
        `;
        if (src === avatar) {
            button.removeAttribute('disabled');
        }
    });
}

function submitHandle(e) {
    e.preventDefault();
    renderState(States.GAME);
    ws.start();
}

function init() {
    renderRadio();

    chooseAvatarForm.avatar.forEach((i) => {
        i.addEventListener('click', () => {
            localStorage.setItem('avatar', i.value);
            button.removeAttribute('disabled');
        });
    });

    chooseAvatarForm.addEventListener('submit', submitHandle);
}

exports.init = init;
exports.avatars = avatars.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
});
