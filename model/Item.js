const { ItemTypes, balance } = require('./constants');

const Entity = require('./Entity');

class Item extends Entity {
    constructor(position, radius, type) {
        super(position, radius);
        this.type = type;
    }

    impact(player) {
        throw new Error('Item.impact is abstract method');
    }
}

class Heal extends Item {
    constructor(position) {
        super(position, balance.HEAL_RADIUS, ItemTypes.HEAL);
    }

    impact(player) {
        // TODO
    }
}

class Posion extends Item {
    constructor(position) {
        super(position, balance.POISON_RADIUS, ItemTypes.POSION)
    }

    imapct(player) {
        // TODO
    }
}

module.exports = {
    Item,
    Heal,
    Posion
}