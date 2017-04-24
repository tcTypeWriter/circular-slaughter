
const Point = require('./Point');
const ba = require('./constants');

class Entity {
    constructor(position, radius) {
        this.pos = new Point(position || { x: 0, y: 0 });
        this.r = radius;
    }

    static isIntersect(e1, e2) {
        // TODO
        let result = e1.pos.distanse(e2.pos);

        return !(e1.r + e2.r < result);
    }

    static distance(e1, e2) {
        // TODO
        let result = e1.pos.distanse(e2.pos);

        return (this.isIntersect(e1, e2)) ? 0 : (result - e1.r - e2.r);
    }

    static isInWorld(e) {
        // TODO

        return !(e.pos.x < ba.balance.MIN_X || e.pos.x > ba.balance.MAX_X
              || e.pos.y < ba.balance.MIN_Y || e.pos.y > ba.balance.MAX_Y);
    }

    // use MIN_X/MAX_X ...

}

module.exports = Entity;