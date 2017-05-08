const assert = require('assert');

const { balance, ItemTypes } = require('../model/constants');

const { Item, Heal, Poison } = require('../model/Item');
const Player = require('../model/Player');

describe('Item - сущность, влияющая на игрока', () => {
    it('type - Тип итема', () => {
        const item = new Item({ x: 0, y: 0 }, 5, 'some type');
        assert.equal(item.type, 'some type');
    });

    describe('Heal - Item, который восстанавливает игроку здоровье', () => {
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

    describe('Poison - Item который постепенно уменьшает здоровье', () => {
        const poison = new Poison({ x: 0, y: 0 });
        const poisonInterval = balance.POISON_TIME_INTERVAL;

        afterEach(() => {
            balance.POISON_TIME_INTERVAL = poisonInterval;
        });

        it(`this.type === ${ItemTypes.POISON}`, () => {
            assert.equal(poison.type, ItemTypes.POISON);
        });

        it(`this.r === ${balance.HEAL_RADIUS}`, () => {
            assert.equal(poison.r, balance.POISON_RADIUS);
        });

        it(`Снимает ${balance.POISON_POWER} здоровья`, () => {
            const player = new Player();
            poison.imapct(player);

            assert.equal(player.health, balance.MAX_PLAYER_HEALTH - balance.POISON_POWER);
        });

        it(`Снимает еще ${balance.POISON_POWER} здоровья через ${balance.POISON_TIME_INTERVAL} мс`, (done) => {
            balance.POISON_TIME_INTERVAL = 100; // уменьшаем задержку для проведения теста

            const player = new Player();
            poison.imapct(player);

            setTimeout(() => {
                assert.equal(player.health, balance.MAX_PLAYER_HEALTH - 2 * balance.POISON_POWER);
                done();
            }, balance.POISON_TIME_INTERVAL + 50);
        });

        it(`Таким образом снимает ${balance.POISON_TICKS} * ${balance.POISON_POWER} здоровья`, (done) => {
            balance.POISON_TIME_INTERVAL = 100; // уменьшаем задержку для проведения теста


            const player = new Player();
            poison.imapct(player);

            const expected = balance.MAX_PLAYER_HEALTH
                                  - balance.POISON_TICKS * balance.POISON_POWER;

            setTimeout(() => {
                assert.equal(player.health, expected);
                done();
            }, (balance.POISON_TICKS - 1) * balance.POISON_TIME_INTERVAL + 50);
        });
    });
});
