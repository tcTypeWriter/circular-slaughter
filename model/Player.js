const { balance, directions } = require('./constants');

const Entity = require('./Entity');

class Player extends Entity {

    constructor(position, r, avatar) {
        super(position, r);
        this.ava = avatar;
        this._health = balance.MAX_PLAYER_HEALTH;
    }

    get health() {
        return this._health;
    }

    set health(value) {
        // TODO logic
        this._health = value;
    }

    get speed() {
        return balance.DEFAULT_PLAYER_SPEED;
    }

    move(direction) {
        // TODO
    }

}


module.exports = Player;
