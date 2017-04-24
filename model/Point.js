
const  ba = require('./constants');

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


    static distanse(a, b) {
        return 0;
    }

    static fromRadial(angle, radius) {
        // TODO
        return new Point({ x: radius*Math.cos(angle), y: radius*Math.sin(angle) });
    }

    static getRandom() {
        // TODO
        return new Point({x : Math.floor(Math.random()*(ba.balance.MAX_X-1)), y: Math.floor(Math.random()*(ba.balance.MAX_Y-1))});
    }
}

module.exports = Point;
