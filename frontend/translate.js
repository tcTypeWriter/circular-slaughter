const Jed = require('jed');

let translator = null;

const defaultJedConfig = {
    missing_key_callback: key => console.error(`There is no translation for phrase '${key}'`),
    domain: 'cs',
    locale_data: {
        cs: {
            '': {
                domain: 'cs',
                plural_forms: 'nplurals=2; plural=(n != 1);',
                lang: 'en',
            },
        },
    },
};

async function changeLangs(lang) {
    const res = await fetch(`langs/${lang}.json`);
    const data = await res.json();

    const { cs } = data.locale_data;
    Object.keys(cs).forEach((k) => {
        if (Array.isArray(cs[k])) {
            cs[k] = data.locale_data.cs[k].filter(x => x !== null);
        }
    });

    translator = new Jed(Object.assign({}, data, defaultJedConfig, data));
}


function _(msgid, string) {
    return translator.translate(msgid).fetch(string);
}

module.exports = {
    async initTranslate() {
        const langs = document.body.querySelector('.lang');
        langs.addEventListener('change', async () => {
            localStorage.setItem('lang', langs.value);
            await changeLangs(langs.value);
            const { renderState } = require('./states');
            renderState();
        });

        let prevLang = localStorage.getItem('lang');
        if (prevLang !== 'en' && prevLang !== 'ru') {
            prevLang = 'en';
        }
        langs.value = prevLang;
        await changeLangs(prevLang);
    },
    changeLangs,
    _,
};

