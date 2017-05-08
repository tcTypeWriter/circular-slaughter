const assert = require('assert');
const { assertDouble } = require('./helpers');

const { balance, TrapTypes, rotateDirections: rDir } = require('../model/constants');

const { Trap, Saw } = require('../model/Trap');
const Player = require('../model/Player');

describe('Trap - ловушка, меняющаяся со временем, и влияющая на игрока', () => {
    it('this.type - тип ловушки', () => {
        const trap = new Trap({ x: 0, y: 0 }, 5, 'some type');
        assert.equal(trap.type, 'some type');
    });

    describe('Saw - циркулярная пила', () => {
        let saw = null;
        beforeEach(() => { saw = new Saw({ x: 0, y: 0 }, 0, 200, rDir.CLOCKWISE); });

        it(`this.type === ${TrapTypes.SAW}`, () => {
            assert.equal(saw.type, TrapTypes.SAW);
        });

        it(`this.r === ${balance.SAW_RADIUS}`, () => {
            assert.equal(saw.r, balance.SAW_RADIUS);
        });

        it('this.center - центр дуги, по которой перемещается пила', () => {
            assert.deepEqual(saw.center, { x: 0, y: 0 });
        });

        it('this.direction - движение вдоль дуги (по или против часовой стрелки)', () => {
            assert.equal(saw.direction, rDir.CLOCKWISE);
        });

        describe.skip(`метод update - перемещает пилу со скоростью ${balance.SAW_SPEED}`, () => {
            it('Перемещение по часовой стрелки', () => {
                saw = new Saw({ x: 0, y: 0 }, 0, 200, rDir.CLOCKWISE);

                saw.update();

                assertDouble(saw.pos.x, 0 + Math.cos(balance.SAW_SPEED / 200) * 200);
                assertDouble(saw.pos.y, 0 + Math.sin(balance.SAW_SPEED / 200) * 200);
            });

            it('Перемещение против часовой стрелки', () => {
                saw = new Saw({ x: 0, y: 0 }, 0, 200, rDir.COUNTER_CLOCKWISE);

                saw.update();

                assertDouble(saw.pos.x, 0 + Math.cos(-balance.SAW_SPEED / 200) * 200);
                assertDouble(saw.pos.y, 0 + Math.sin(-balance.SAW_SPEED / 200) * 200);
            });
        });

        describe.skip(`метод impact - наносит игроку ${balance.SAW_DAMAGE} урона`, () => {
            let player = null;

            const saw_interval = balance.SAW_DAMAGE_INTERVAL;

            beforeEach(() => {
                saw = new Saw({ x: 0, y: 0 }, 0, 200, rDir.COUNTER_CLOCKWISE);
                player = new Player({ x: 0, y: 0 }, 5, '');
            });

            afterEach(() => { balance.SAW_DAMAGE_INTERVAL = saw_interval; });

            it(`нанесение ${balance.SAW_DAMAGE} урона игроку`, () => {
                saw.impact(player);

                assert.equal(player.health, balance.MAX_PLAYER_HEALTH - balance.SAW_DAMAGE);
            });

            it(`Нельзя нанести урон в течении ${balance.SAW_DAMAGE_INTERVAL} мс`, () => {
                saw.impact(player);
                saw.impact(player);
                saw.impact(player);

                assert.equal(player.health, balance.MAX_PLAYER_HEALTH - balance.SAW_DAMAGE);
            });

            it(`Нанесение ${balance.SAW_DAMAGE} после истечения ${balance.SAW_DAMAGE_INTERVAL} мс`, (done) => {
                saw.impact(player);

                balance.SAW_DAMAGE_INTERVAL = 100; // уменьшаем задержку для ускорения теста

                setTimeout(() => {
                    saw.impact(player);
                    assert.equal(player.health, balance.MAX_PLAYER_HEALTH - 2 * balance.SAW_DAMAGE);
                    done();
                }, balance.SAW_DAMAGE_INTERVAL + 50);
            });
        });
    });
});
