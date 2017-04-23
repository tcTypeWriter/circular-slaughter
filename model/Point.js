
class Point {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
    }

    add(b) {
        var a = this.x;
        var c = this.y;
        this.x = a + b.x;
        this.y = c + b.y;
    }
    

    static fromRadial(angle, radius) {
        // TODO
        return new Point({ x: radius*Math.cos(angle), y: radius*Math.sin(angle) });
    }

    static getRandom() {
        // TODO
        return new Point({x : Math.floor(Math.random()*(800-1))+0, y: Math.floor(Math.random()*(600-1))+0});
    }
}

module.exports = Point;
