
const Point = require('./Point');
const ba = require('./constants');

class Entity {
    constructor(position, radius) {
        this.pos = new Point(position || { x: 0, y: 0 });
        this.r = radius;
    }

    static calcPart(e1,e2) {
       var dx = Math.abs(e2.pos.x - e1.pos.x);
       var dy = Math.abs(e2.pos.y - e1.pos.y);
       var dx1 = dx*dx;
       var dy1 = dy*dy;
       return Math.sqrt(dx1+dy1);
    }

    static isIntersect(e1, e2) {
        // TODO
        var c = this.calcPart(e1,e2);
        if (e1.r+e2.r< c) {
                return false;
        }
        else  
        {
            return true;
        }
    }

    static distance(e1, e2) {
        // TODO
        var d = this.calcPart(e1,e2);
        if (this.isIntersect(e1,e2)==true){
            return 0;
        }
        else {
            return (d-(e1.r+e2.r));
        }
    }

    static isInWorld(e) {
        // TODO
        if ((e.pos.x < 0 || e.pos.x > 800) && (e.pos.y < 0 || e.pos.y > 600)){
            return false;
        }
        else {
            return true;
        }
        // use MIN_X/MAX_X ...
    }
}

module.exports = Entity;