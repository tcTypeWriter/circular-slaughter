const assert = require('assert');
const { assertDouble } = require('./helpers');

const Player = require('../model/Player');
const Point = require('../model/Point');

const { balance, BulletTypes } = require('../model/constants');
const { LightBullet, BalancedBullet, HeavyBullet } = require('../model/Bullet');

describe.skip('Bullet - пули.', () => {
    describe('LightBullet - быстрая легкая пуля', () => {
        let bullet = null;

        beforeEach(() => { bullet = new LightBullet({ x: 0, y: 0 }, { x: 300, y: 400 }); });

        it(`this.type === ${BulletTypes.LIGHT}`, () => {
            assert.equal(bullet.type, BulletTypes.LIGHT);
        });

        it('this.speed - вектор скорости пули', () => {
            assert.ok(bullet.speed instanceof Point);
        });

        it('this.speed коллинеарен вектору от position до target', () => {
            const s = bullet.speed;

            const det = s.x * 400 - s.y * 300;

            // Определитель двух коллинеарных векторов 0
            assertDouble(det, 0);
        });

        it(`this.speed имеет длинну ${balance.BULLET_SPEED[BulletTypes.LIGHT]}`, () => {
            const length = bullet.speed.length;

            assertDouble(length, balance.BULLET_SPEED[BulletTypes.LIGHT]);
        });

        it('update - сдвигает пулю на this.speed', () => {
            const { pos, speed } = bullet;

            bullet.update();

            assertDouble(bullet.pos.x, pos.x + speed.x);
            assertDouble(bullet.pos.y, pos.y + speed.y);
        });

        it(`impact - наносит игроку ${balance.BULLET_DAMAGE[BulletTypes.LIGHT]} урона`, () => {
            const damage = balance.BULLET_DAMAGE[BulletTypes.LIGHT];
            const player = new Player({ x: 0, y: 0 }, 10, 'test');

            bullet.impact(player);

            assert.equal(player.health, balance.MAX_PLAYER_HEALTH - damage);
        });
    });

    describe('BalancedBullet - сбалансированная пуля', () => {
        let bullet = null;

        beforeEach(() => { bullet = new BalancedBullet({ x: 0, y: 0 }, { x: 300, y: 400 }); });

        it(`this.type === ${BulletTypes.LIGHT}`, () => {
            assert.equal(bullet.type, BulletTypes.BALANCED);
        });

        it('this.speed - вектор скорости пули', () => {
            assert.ok(bullet.speed instanceof Point);
        });

        it('this.speed коллинеарен вектору от position до target', () => {
            const s = bullet.speed;

            const det = s.x * 400 - s.y * 300;

            // Определитель двух коллинеарных векторов 0
            assertDouble(det, 0);
        });

        it(`this.speed имеет длинну ${balance.BULLET_SPEED[BulletTypes.BALANCED]}`, () => {
            const length = bullet.speed.length;

            assertDouble(length, balance.BULLET_SPEED[BulletTypes.BALANCED]);
        });

        it('update - сдвигает пулю на this.speed', () => {
            const { pos, speed } = bullet;

            bullet.update();

            assertDouble(bullet.pos.x, pos.x + speed.x);
            assertDouble(bullet.pos.y, pos.y + speed.y);
        });

        it(`impact - наносит игроку ${balance.BULLET_DAMAGE[BulletTypes.BALANCED]} урона`, () => {
            const damage = balance.BULLET_DAMAGE[BulletTypes.BALANCED];
            const player = new Player({ x: 0, y: 0 }, 10, 'test');

            bullet.impact(player);

            assert.equal(player.health, balance.MAX_PLAYER_HEALTH - damage);
        });
    });

    describe('HeavyBullet - тяжелая медленная пуля', () => {
        let bullet = null;

        beforeEach(() => { bullet = new HeavyBullet({ x: 0, y: 0 }, { x: 300, y: 400 }); });

        it(`this.type === ${BulletTypes.HEAVY}`, () => {
            assert.equal(bullet.type, BulletTypes.HEAVY);
        });

        it('this.speed - вектор скорости пули', () => {
            assert.ok(bullet.speed instanceof Point);
        });

        it('this.speed коллинеарен вектору от position до target', () => {
            const s = bullet.speed;

            const det = s.x * 400 - s.y * 300;

            // Определитель двух коллинеарных векторов 0
            assertDouble(det, 0);
        });

        it(`this.speed имеет длинну ${balance.BULLET_SPEED[BulletTypes.HEAVY]}`, () => {
            const length = bullet.speed.length;

            assertDouble(length, balance.BULLET_SPEED[BulletTypes.HEAVY]);
        });

        it('update - сдвигает пулю на this.speed', () => {
            const { pos, speed } = bullet;

            bullet.update();

            assertDouble(bullet.pos.x, pos.x + speed.x);
            assertDouble(bullet.pos.y, pos.y + speed.y);
        });

        it(`impact - наносит игроку ${balance.BULLET_DAMAGE[BulletTypes.LIGHT]} урона`, () => {
            const damage = balance.BULLET_DAMAGE[BulletTypes.LIGHT];
            const player = new Player({ x: 0, y: 0 }, 10, 'test');

            bullet.impact(player);

            assert.equal(player.health, balance.MAX_PLAYER_HEALTH - damage);
        });
    });
});
