const assert = require('assert');

const { balance, ItemTypes } = require('../model/constants');

const { Item, Heal, Posion } = require('../model/Item');
const Player = require('../model/Player');

describe('Item - сущность, влияющая на игрока', () => {

    it('type - Тип итема', () => {
        const item = new Item({ x: 0, y: 0 }, 5, 'some type');
        assert.equal(item.type, 'some type');
    });

    describe.skip('Heal - Item который фосстанавливает игроку здоровье', () => {
        const heal = new Heal({ x: 0, y: 0 });

        it(`this.type === ${ItemTypes.HEAL}`, () => {
            assert.equal(heal.type, ItemTypes.HEAL);
        });

        it(`this.r === ${balance.HEAL_RADIUS}`, () => {
            assert.equal(heal.r, balance.HEAL_RADIUS);
        });

        it(`this.impact(player) -> player.health += ${balance.HEAL_POWER}`, () => {
            const player = new Player();

            player.health = 50;
            heal.impact(player);

            assert.equal(player.health, 50 + balance.HEAL_POWER);
        });

    });

    describe.skip('Posion - Item который фосстанавливает игроку здоровье', () => {
        const posion = new Posion({ x: 0, y: 0 });
        let posion_interval = balance.POSION_TIME_INTERVAL;

        afterEach(() => balance.POSION_TIME_INTERVAL = posion_interval);

        it(`this.type === ${ItemTypes.POSION}`, () => {
            assert.equal(posion.type, ItemTypes.POSION);
        });

        it(`this.r === ${balance.HEAL_RADIUS}`, () => {
            assert.equal(posion.r, balance.POISON_RADIUS);
        });

        it(`Снимает ${balance.POISON_POWER} здоровья`, () => {
            const player = new Player();
            posion.imapct(player);

            assert.equal(player.health, balance.MAX_PLAYER_HEALTH - balance.POISON_POWER);
        });

        it(`Снимает еще ${balance.POISON_POWER} здоровья через ${balance.POSION_TIME_INTERVAL} мс`, (done) => {
            const player = new Player();
            posion.imapct(player);

            balance.POSION_TIME_INTERVAL = 100; // уменьшаем задержку для проведения теста

            setTimeout(() => {
                assert.equal(player.health, balance.MAX_PLAYER_HEALTH - 2 * balance.POISON_POWER);
                done();
            }, balance.POSION_TIME_INTERVAL + 50);
        });

        it(`Таким образом снимает ${balance.POISON_TICKS} * ${balance.POISON_POWER} здоровья`, (done) => {
            const player = new Player();
            posion.imapct(player);

            balance.POSION_TIME_INTERVAL = 100; // уменьшаем задержку для проведения теста

            setTimeout(() => {
                assert.equal(player.health, balance.MAX_PLAYER_HEALTH - balance.POISON_TICKS * balance.POISON_POWER);
                done();
            }, (balance.POISON_TICKS - 1) * balance.POSION_TIME_INTERVAL + 50);
        });

    });

});
