const { BulletTypes, balance } = require('./constants');

const Point = require('./Point');
const Entity = require('./Entity');

class Bullet extends Entity {
    constructor(position, type, speed) {
        super(position, balance.BULLET_RADIUS);
        this.type = type;
        this.speed = speed;
    }

    update() {
        throw new Error('Bullet.update is abstract method');
    }

    impact(player) {
        throw new Error('Bullet.impact is abstract method');
    }
}

class LightBullet extends Bullet {
    constructor(position, target) {
        const speed = new Point({ x: 0, y: 0 });
        super(position, BulletTypes.LIGHT, speed);
    }

    update() {
        // TODO
    }

    impact(player) {
        // TODO
    }
}

class BalancedBullet extends Bullet {
    // TODO
}


class HeavyBullet extends Bullet {
    // TODO
}

module.exports = {
    Bullet,
    LightBullet,
    BalancedBullet,
    HeavyBullet
};
