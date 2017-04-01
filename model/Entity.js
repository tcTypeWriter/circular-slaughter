
const Point = require('./Point');

class Entity {
    constructor(position, radius) {
        this.pos = new Point(position || { x: 0, y: 0 });
        this.r = radius;
    }

    static isIntersect(e1, e2) {
        // TODO
    }

    static distance(e1, e2) {
        // TODO
    }

    static isInWorld(e) {
        // TODO
        // use MIN_X/MAX_X ...
    }
}

module.exports = Entity;