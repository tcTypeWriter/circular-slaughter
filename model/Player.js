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
        if (value < 0) {
            this._health = 0;
        } else if (value > balance.MAX_PLAYER_HEALTH) {
            this._health = balance.MAX_PLAYER_HEALTH;
        } else {
            this._health = value;
        }
        return this._health;
    }

    get speed() {
        return balance.DEFAULT_PLAYER_SPEED;
    }

    move(direction) {
        const diagonalShift = this.speed / Math.sqrt(2);
        const prevX = this.pos.x;
        const prevY = this.pos.y;
        switch (direction) {
        case directions.RIGHT:
            this.pos = new Point({ x: prevX + this.speed, y: prevY });
            break;
        case directions.LEFT:
            this.pos = new Point({ x: prevX - this.speed, y: prevY });
            break;
        case directions.UP:
            this.pos = new Point({ x: prevX, y: prevY - this.speed });
            break;
        case directions.DOWN:
            this.pos = new Point({ x: prevX, y: prevY + this.speed });
            break;
        case (directions.RIGHT | directions.UP):
            this.pos = new Point({ x: prevX + diagonalShift, y: prevY - diagonalShift });
            break;
        case (directions.RIGHT | directions.DOWN):
            this.pos = new Point({ x: prevX + diagonalShift, y: prevY + diagonalShift });
            break;
        case (directions.LEFT | directions.UP):
            this.pos = new Point({ x: prevX - diagonalShift, y: prevY - diagonalShift });
            break;
        case (directions.LEFT | directions.DOWN):
            this.pos = new Point({ x: prevX - diagonalShift, y: prevY + diagonalShift });
            break;
        default:
        }
        return this.pos;
    }

}


module.exports = Player;
