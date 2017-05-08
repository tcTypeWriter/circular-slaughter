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
        player.health += balance.HEAL_POWER;
    }
}

class Poison extends Item {
    constructor(position) {
        super(position, balance.POISON_RADIUS, ItemTypes.POISON);
    }

    imapct(player) {
        let ticks = balance.POISON_TICKS;
        player.health -= balance.POISON_POWER;

        const interval = setInterval(() => {
            ticks -= 1;
            if (ticks <= 0) {
                clearInterval(interval);
                return;
            }
            player.health -= balance.POISON_POWER;
        }, balance.POISON_TIME_INTERVAL);
    }
}

class MachineGun extends Item {
    constructor(position) {
        super(position, balance.GUN_RADIUS, ItemTypes.MACHINE_GUN);
    }

    imapct(player) {

    }
}

class Pistol extends Item {
    constructor(position) {
        super(position, balance.GUN_RADIUS, ItemTypes.Pistol);
    }

    imapct(player) {

    }
}

class RocketGun extends Item {
    constructor(position) {
        super(position, balance.GUN_RADIUS, ItemTypes.ROCKET_GUN);
    }

    imapct(player) {

    }
}

module.exports = {
    Item,
    Heal,
    Poison,
    MachineGun,
    Pistol,
    RocketGun,
};
