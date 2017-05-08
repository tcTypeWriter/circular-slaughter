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
        player._health += balance.HEAL_POWER;
    }
}

class Posion extends Item {
    constructor(position) {
        super(position, balance.POISON_RADIUS, ItemTypes.POSION)
    }

    imapct(player) {
        // TODO

        //let t = setTimeout(this.imapct.bind(player), balance.POSION_TIME_INTERVAL);
        let ticks = balance.POISON_TICKS;
        let a = player._health;
        a -= balance.POISON_POWER;
        player._health = a;
        let interval = setInterval(() => {
            ticks--;
            if (ticks <= 0) {
                clearInterval(interval);
                return
            }
            this.imapct;
            // do some shit
        }, balance.POSION_TIME_INTERVAL);
        //for (let i = 1; i <= balance.POISON_TICKS; i++) {
        //setTimeout(
        // ()=>{
        // player._health-=balance.POISON_POWER;
        //},
        // balance.POSION_TIME_INTERVAL
        //);
        //  }


    }
}

module.exports = {
    Item,
    Heal,
    Posion
}