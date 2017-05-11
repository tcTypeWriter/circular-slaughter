
const { balance } = require('./constants');

const Point = require('./Point');
const Player = require('./Player');

class Game {
    constructor() {
        this.players = [];
        this.bullets = [];
        this.traps = [];
        this.items = [];
    }

    /**
     * Запускает игровые таймеры, которые генерируют события в игре
     */
    start() {
        if (this.trapTimeout || this.itemTimeout) {
            console.warn('Trying to start game again');
            return;
        }

        setInterval(this.update.bind(this), 1000);
    }

    stop() {
        clearTimeout(this.trapTimeout);
        clearTimeout(this.itemTimeout);
        this.trapTimeout = this.itemTimeout = null;
    }

    createPlayer(src, login) {
        const player = new Player(Point.getRandom(), src, login);
        this.players.push(player);
        return player;
    }

    generateNewTrap() {

    }

    generateNewItem() {

    }

    update() {
        this.players.forEach((p) => { p.health -= 5; });
    }

    bulletsUpdate() {

    }

    trapsUpdate() {

    }
}

module.exports = Game;
