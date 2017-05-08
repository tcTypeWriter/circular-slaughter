const { balance, TrapTypes } = require('./constants');

const Point = require('./Point');
const Entity = require('./Entity');

class Trap extends Entity {
    constructor(position, radius, type) {
        super(position, radius);
        this.type = type;
    }

    update() {
        throw new Error('Trap.update is abstract method');
    }

    impact(player) {
        throw new Error('Trap.impact is abstract method');
    }
}


/**
 * Циркулярная пила
 * Перемещается по дуге через всю карту
 */
class Saw extends Trap {
    constructor(center, angle, arcRadius, direction) {
        center = new Point(center);
        const position = center.add(Point.fromRadial(angle, arcRadius));

        super(position, balance.SAW_RADIUS, TrapTypes.SAW);

        this.center = center;
        this.direction = direction;
    }

    update() {
        // TODO
    }

    impact(player) {
        // TODO
    }
}

module.exports = {
    Trap,
    Saw,
};
