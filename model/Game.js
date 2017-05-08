
const { balance } = require('./constants');

class Game {
    constructor() {
        this.players = [];
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

        const newTrapEvent = () => {
            this.generateNewTrap();
            this.trapTimeout = setTimeout(newTrapEvent, balance.NEW_TRAP_TIMEOUT);
        };

        const newItemEvent = () => {
            this.generateNewItem();
            this.itemTimeout = setTimeout(newItemEvent, balance.NEW_ITEM_TIMEOUT);
        };

        newItemEvent();
        newTrapEvent();
    }

    stop() {
        clearTimeout(this.trapTimeout);
        clearTimeout(this.itemTimeout);
        this.trapTimeout = this.itemTimeout = null;
    }

    generateNewTrap() {
        // TODO
    }

    generateNewItem() {
        // TODO
    }

}

module.exports = Game;
