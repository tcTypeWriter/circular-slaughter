
const {balance, ItemTypes, TrapTypes} = require('./constants');

const Player = require('./Player');
const Trap = require('./Trap');
const Item = require('./Item');

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
        if(this.trapTimeout || this.itemTimeout) {
            console.warn('Trying to start game again');
            return;
        }

        let newTrapEvent = () => {
            this.generateNewTrap();
            this.trapTimeout = setTimeout(newTrapEvent, balance.NEW_TRAP_TIMEOUT);
        };

        let newItemEvent = () => {
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
