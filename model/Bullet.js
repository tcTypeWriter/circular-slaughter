const { BulletTypes, balance } = require('./constants');

const Point = require('./Point');
const Entity = require('./Entity');

class Bullet extends Entity {
    constructor(position, type, target) {
        super(position, balance.BULLET_RADIUS);

        const speed = new Point({ x: 0, y: 0 });
        this.type = type;
        this.speed = speed;
    }

    update() {

    }

    impact(player) {

    }
}

class LightBullet extends Bullet {
    constructor(position, target) {
        super(position, BulletTypes.LIGHT, target);
    }
}

class BalancedBullet extends Bullet {
    constructor(position, target) {
        super(position, BulletTypes.BALANCED, target);
    }
}

class HeavyBullet extends Bullet {
    constructor(position, target) {
        super(position, BulletTypes.HEAVY, target);
    }
}

module.exports = {
    Bullet,
    LightBullet,
    BalancedBullet,
    HeavyBullet,
};
