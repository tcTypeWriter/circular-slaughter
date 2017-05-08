const Jed = require('jed');


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
        await changeLangs('ru');
    },
    changeLangs,
    _,
};

