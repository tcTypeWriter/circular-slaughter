
let translator = null;

const defaultJedConfig = {
    missing_key_callback: key => console.error(`There is no translation for phrase '${key}'`),
    domain: 'cs',
    locale_data: {
        mur: {
            '': {
                domain: 'cs',
                plural_forms: 'nplurals=2; plural=(n != 1);',
                lang: 'en',
            },
        },
    },
};

async function changeLangs() {
    const res = await fetch('langs/ru.json');
    const data = await res.json();

    for (const key in data.locale_data.cs) {
        if (Array.isArray(data.locale_data.cs[key])) {
            data.locale_data.cs[key] = data.locale_data.cs[key].filter(x => x !== null);
        }
    }

    translator = new Jed(Object.assign({}, data, defaultJedConfig, data));
}


function _(msgid, string) {
    return translator.translate(msgid).fetch(string);
}

const sections = {
    login: document.getElementById('login'),
    chooseAvatar: document.getElementById('chooseAvatar'),
    game: document.getElementById('game'),
    records: document.getElementById('records'),
};
async function main(params) {
    await changeLangs();
    console.log(_('Hello, world!'));
}

main();
_('abc');
function webSocketExample() {
    let model = {};

    function renderData(data) {
        const { points, id } = data;
        const ctx = document.getElementById('canvas').getContext('2d');

        ctx.clearRect(0, 0, 800, 600);
        _('Hello, Jed');
        points.forEach((point, i) => {
            ctx.fillStyle = i === id ? 'red' : 'blue';
            ctx.fillRect(point.x, point.y, 20, 20);
        });
    }

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = ({ data: recievedText }) => {
        const data = JSON.parse(recievedText);
        model = Object.assign(model, data);
        renderData(model);
    };

    const send = object => ws.send(JSON.stringify(object));
    const move = direction => send({ method: 'move', direction });
    const keys = {
        ArrowLeft: 'left',
        ArrowUp: 'up',
        ArrowRight: 'right',
        ArrowDown: 'down',
    };

    document.addEventListener('keypress', (e) => {
        if (keys[e.key]) {
            move(keys[e.key]);
        }
    });
}

// po2json:
// 	$(PO2JSON) --pretty --format jed --domain mur locales/en/mur.po locales/en/mur.json
// 	$(PO2JSON) --pretty --format jed --domain mur locales/ru/mur.po locales/ru/mur.json


// class Translation {
//   constructor() {
//     this.subscribers = [];
//     this.defaultLang = "en";
//     this.domain = "mur";
//     this.defaultJedConfig = {
//       missing_key_callback: (key) => console.error(`There is no translation for phrase '${key}'`),
//       "domain": "mur",
//       "locale_data": {
//         "mur": {
//           "": {
//             "domain": "mur",
//             "plural_forms": "nplurals=2; plural=(n != 1);",
//             "lang": "en",
//           },
//         },
//       },
//     };
//     this.translator = new Jed(this.defaultJedConfig);
//     this._t = this._t.bind(this);
//     this._nt = this._nt.bind(this);
//   }

//   _t(msgid, string) {
//     return this.translator.translate(msgid).fetch(string);
//   }

//   _nt(msgid, plural, count) {
//     return this.translator.translate(msgid).ifPlural(count, plural).fetch(count);
//   }

//   async initialize() {
//     await this.loadAvailableLangs();
//     this.changeLang(this.getLang());
//     this.currentLang = this.getLang();
//   }

//   changeLang(lang) {
//     let data = null;
//     try {
//       data = require(`../../../../locales/${lang}/${this.domain}.json`);
//     } catch (err) {
//       console.error(err.stack);
//       data = require(`../../../../locales/${this.defaultLang}/${this.domain}.json`);
//     }
//     this.initJed(data);
//     this.afterLangChanged(lang);
//   }

//   getLang() {
//     const {currentLang} = localStorage;
//     if (currentLang) {
//       return currentLang;
//     }
//     if (this.defaultSettingLang) {
//       return this.defaultSettingLang;
//     }
//     const browserLang = navigator.language || navigator.userLanguage;
//     if (browserLang) {
//       return browserLang;
//     }
//     return this.defaultLang;
//   }

//   async loadAvailableLangs() {
//     const {langs, defaultLang} = await $.get("langs");
//     this.availableLangs = langs;
//     this.defaultSettingLang = defaultLang;
//   }

//   initJed(data) {
//     data = {...this.defaultJedConfig, ...data};
//     this.translator = new Jed(data);
//   }

//   afterLangChanged(lang) {
//     localStorage.setItem("currentLang", lang);

//     bootbox.setDefaults({locale: lang});
//     $.cookie("lang", lang);

//     this.loadPluginLocales(lang);
//     store.dispatch({type: LANG_CHANGED, lang});
//   }

//   loadPluginLocales(lang) {
//     if (lang !== "en") {
//       require(`moment/locale/${lang}`);
//     }
//     moment.locale(lang);
//   }

//   subscribe(func) {
//     this.subscribers.push(func);
//   }
// }
