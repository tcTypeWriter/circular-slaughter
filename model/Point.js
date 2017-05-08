
const ba = require('./constants');

class Point {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
    }

    add(b) {
        return new Point({
            x: this.x + b.x,
            y: this.y + b.y,
        });
    }

    distance(b) {
        const distX = b.x - this.x;
        const distY = b.y - this.y;
        return Math.sqrt((distX * distX) + (distY * distY));
    }

    get length() {
        return this.distance({ x: 0, y: 0 });
    }

    toString() {
        return JSON.stringify(this);
    }

    static fromRadial(angle, radius) {
        return new Point({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    }

    static getRandom() {
        return new Point({
            x: Math.floor(Math.random() * (ba.balance.MAX_X - 1)),
            y: Math.floor(Math.random() * (ba.balance.MAX_Y - 1)),
        });
    }
}

module.exports = Point;
