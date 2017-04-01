
const assert = require('assert');

const Game = require('../model/Game');
const {Trap} = require('../model/Trap');
const {Item} = require('../model/Item');

describe.skip('Game - обьект, свзывающий все сущности', () => {

    it('this.generateNewTrap - создает случайную ловушку, со случайным параметрами', () => {
        const game = new Game();

        game.generateNewTrap();
        const trap = game.traps[0];

        assert.ok(trap instanceof Trap);
    });

    it('this.generateNewItem - создает случайный предмет', () => {
        const game = new Game();

        game.generateNewItem();
        const item = game.items[0];

        assert.ok(item instanceof Trap);
    });

});