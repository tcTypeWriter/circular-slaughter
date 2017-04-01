const assert = require('assert');

const { balance, directions: dir } = require('../model/constants');
const Player = require('../model/Player');

describe('Player -  сущность игрок', () => {

    it('ava - аватар игрока', () => {
        const player = new Player({ x: 0, y: 0 }, 10, '/img/test.png');

        assert.equal(player.ava, '/img/test.png');
    });

    it('speed - текущая скорость игрока, определяется константой DEFAULT_PLAYER_SPEED', () => {
        const player = new Player({ x: 0, y: 0 }, 10, '');
        assert.equal(player.speed, balance.DEFAULT_PLAYER_SPEED);
    });

    it('health - здоровье игрока, изначально определяется константой MAX_PLAYER_HEALTH', () => {
        const player = new Player({ x: 0, y: 0 }, 10, '');
        assert.equal(player.health, balance.MAX_PLAYER_HEALTH);
    });

    describe.skip('Изменение здоровья (допустимо от 0 до MAX_PLAYER_HEALTH)', () => {
        let player = new Player();

        beforeEach(() => {
            player = new Player({ x: 0, y: 0 }, 5);
        });

        it('Допустимое изменение', () => {
            player.health = 42;
            assert.equal(player.health, 42);
        });

        it('Если пытаются поставить меньше нуля, то health === 0', () => {
            player.health = -42;
            assert.equal(player.health, 0);
        });

        it('Если пытаются поставить больше MAX_PLAYER_HEALTH, то health === MAX_PLAYER_HEALTH', () => {
            player.health = balance.MAX_PLAYER_HEALTH + 9999;
            assert.equal(player.health, balance.MAX_PLAYER_HEALTH);
        });
    });

    describe.skip('Метод move - перемещает игрока', () => {
        let player = new Player();
        let speed = 0;
        let diagonalShift = 0;

        beforeEach(() => {
            player = new Player({ x: 0, y: 0 }, 5);
            speed = player.speed;
            diagonalShift = speed / Math.sqrt(2);
        });

        it('move(RIGHT)', () => {
            player.move(dir.RIGHT);
            assert.deepEqual(player.pos, { x: speed, y: 0 });
        });

        it('move(LEFT)', () => {
            player.move(dir.LEFT);
            assert.deepEqual(player.pos, { x: -speed, y: 0 });
        });

        it('move(UP)', () => {
            player.move(dir.UP);
            assert.deepEqual(player.pos, { x: 0, y: -speed });
        });

        it('move(DOWN)', () => {
            player.move(dir.DOWN);
            assert.deepEqual(player.pos, { x: 0, y: speed });
        });

        it('move(RIGHT | UP)', () => {
            player.move(dir.RIGHT | dir.UP);
            assert.deepEqual(player.pos, { x: diagonalShift, y: -diagonalShift });
        });

        it('move(RIGHT | DOWN)', () => {
            player.move(dir.RIGHT | dir.DOWN);
            assert.deepEqual(player.pos, { x: diagonalShift, y: diagonalShift });
        });

        it('move(LEFT | UP)', () => {
            player.move(dir.LEFT | dir.UP);
            assert.deepEqual(player.pos, { x: -diagonalShift, y: -diagonalShift });
        });

        it('move(LEFT | DOWN)', () => {
            player.move(dir.LEFT | dir.DOWN);
            assert.deepEqual(player.pos, { x: -diagonalShift, y: diagonalShift });
        });

        it('move(UP | DOWN)', () => {
            player.move(dir.DOWN | dir.UP);
            assert.deepEqual(player.pos, { x: 0, y: 0 });
        });

        it('move(LEFT | RIGHT)', () => {
            player.move(dir.LEFT | dir.RIGHT);
            assert.deepEqual(player.pos, { x: 0, y: 0 });
        });
    });

});
