const { balance, directions } = require('./constants');

const Entity = require('./Entity');
const Point = require('./Point');

class Player extends Entity {

    constructor(position, r, avatar) {
        super(position, r);
        this.ava = avatar;
        this._health = balance.MAX_PLAYER_HEALTH;
    }

    get health() {
        return this._health;
    }

    set health(value) {
        // TODO logic
        this._health = value;
        if (value > 0 && value < balance.MAX_PLAYER_HEALTH) {
            return value;
        }
        else if (value <= 0) { return this._health = 0 }
        else { return this._health = balance.MAX_PLAYER_HEALTH }
    }

    get speed() {
        return balance.DEFAULT_PLAYER_SPEED;
    }

    move(direction) {
        // TODO
        let diagonalShift = this.speed / Math.sqrt(2);
        let prevX = this.pos.x;
        let prevY = this.pos.y;
        switch (direction) {
            case directions.RIGHT:
                return this.pos = new Point({ x: prevX + this.speed, y: prevY });
                break;
            case directions.LEFT:
                return this.pos = new Point({ x: prevX - this.speed, y: prevY });
                break;
            case directions.UP:
                return this.pos = new Point({ x: prevX, y: prevY - this.speed });
                break;
            case directions.DOWN:
                return this.pos = new Point({ x: prevX, y: prevY + this.speed });
                break;
            case (directions.RIGHT | directions.UP):
                return this.pos = new Point({ x: prevX + diagonalShift, y: prevY - diagonalShift });
                break;
            case (directions.RIGHT | directions.DOWN):
                return this.pos = new Point({ x: prevX + diagonalShift, y: prevY + diagonalShift });
                break;
            case (directions.LEFT | directions.UP):
                return this.pos = new Point({ x: prevX - diagonalShift, y: prevY - diagonalShift });
                break;
            case (directions.LEFT | directions.DOWN):
                return this.pos = new Point({ x: prevX - diagonalShift, y: prevY + diagonalShift });
                break;
            case (directions.UP | directions.DOWN):
                return this.pos;
                break;
            case (directions.LEFT | directions.RIGHT):
                return this.pos;
                break;
            default:
                return this.pos;


        }

    }

}


module.exports = Player;
