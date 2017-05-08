/**
 * Спонсор авторизации "Костыли и велосипеды"
 * Ломать смогут, но не будут (красть особо нечего)
 * После можно доработать
 */
const crypto = require('crypto');

const Router = require('express').Router;

const db = require('./db');


const sessions = {};

function gen_uuid() {
    let session = {};
    let tries = 10;
    let uuid;

    while (session && tries > 0) {
        uuid = crypto.randomBytes(16).toString('base64');
        session = sessions[uuid];
        tries -= 1;
    }

    return tries === 0 ? undefined : uuid;
}

function clearSession(uuid) {
    delete sessions[uuid];
}

const auth = Router();

auth.get('/session/current', (req, res) => {
    const session = req.cookies && sessions[req.cookies.uuid];
    if (!session) {
        return res.sendStatus(401);
    }
    return res.json(session);
});


auth.post('/session/current', (req, res, next) => {
    const { login, password } = req.body || {};
    if (!login || !password) {
        return res.sendStatus(401);
    }

    return db.findUser(login, password, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.json({
                type: 'error',
                message: 'bad login / password',
            });
        }

        const uuid = gen_uuid();
        if (!uuid) {
            return next(Error('A lot of sessions'));
        }

        sessions[uuid] = Object.assign({}, user, { password: undefined });
        setTimeout(clearSession, 18 * 60 * 1000, uuid);
        res.cookie('uuid', uuid);

        return res.json(sessions[uuid]);
    });
});


auth.post('/session', (req, res) => {
    const { login, password } = req.body || {};
    if (!login || !password) {
        return res.sendStatus(400);
    }

    return db.createUser(login, password, function created(err) {
        if (err) {
            return res.json({
                type: 'error',
                message: err.message,
            });
        }
        // function исполняется в контексте statment (run query)
        return res.json({ id: this.lastID });
    });
});


auth.delete('/session/current', (req, res) => {
    const uuid = req.cookies && req.cookies.uuid;
    if (uuid) {
        delete sessions[uuid];
        return res.sendStatus(200);
    }
    return res.sendStatus(400);
});

module.exports = {
    auth,
    getSession(uuid) {
        return sessions[uuid];
    },
};
