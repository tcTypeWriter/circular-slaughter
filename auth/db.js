const path = require('path');

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(path.join(__dirname, 'circular-slaughter.sqlite3'));

const moduleAPI = {
    init() {
        db.serialize(() => {
            db.exec(
                `CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY ASC AUTOINCREMENT,
                    login VARCHAR(255) UNIQUE,
                    password VARCHAR(255)
                );`, () => console.log('Таблица Users создна'));
        });
    },

    findUser(login, password, callback) {
        console.log(`[findUser] login='${login}' password='${password}'`);

        db.get(
            'SELECT * FROM Users WHERE login = ? and password = ?',
            [login, password],
            callback);
    },

    createUser(login, password, callback) {
        console.log(`[createUser] login='${login}' password='${password}'`);

        db.run(
            'INSERT INTO Users (login, password) VALUES (?, ?)',
            [login, password],
            callback);
    },
};

module.exports = moduleAPI;

/**
 *
 * Ручной тест методов public
 * Перед запуском следует убедится, что база не создана
 * Иначе возможно возникновение ошибки
 *
 */
if (require.main === module) {
    const assert = require('assert'); // eslint-disable-line global-require

    moduleAPI.init();

    moduleAPI.createUser('admin', 'admin', (err1) => {
        if (err1) {
            return console.warn(err1);
        }

        return moduleAPI.findUser('admin', 'admin', (err2, user) => {
            if (err2) {
                return console.warn(err2);
            }

            assert(user);
            return console.log(`Пользователь '${user.login}' существует\n${JSON.stringify(user, null, 2)}`);
        });
    });
}
