const assert = require('assert');
const { assertDouble } = require('./helpers');

const Entity = require('../model/Entity');

describe('Entity - базовый класс для игровых сущностей', () => {
    it('this.pos - координаты сущности', () => {
        const e = new Entity({ x: 0, y: 0 }, 5);

        assert.deepEqual(e.pos, { x: 0, y: 0 });
    });

    it('this.r - радиус сущности', () => {
        const e = new Entity({ x: 0, y: 0 }, 6);

        assert.equal(e.r, 6);
    });

    describe('isIntersect - метод, определяющий пересекаются ли сущности', () => {
        const e0_0 = new Entity({ x: 0, y: 0 }, 5);
        const e10_10 = new Entity({ x: 10, y: 10 }, 5);
        const e0_5 = new Entity({ x: 0, y: 5 }, 5);
        const e0_10 = new Entity({ x: 0, y: 10 }, 5);

        it('false - не пересекающиеся entity', () => {
            assert.ok(!Entity.isIntersect(e0_0, e10_10));
        });

        it('true - пересекающиеся entity', () => {
            assert.ok(Entity.isIntersect(e0_0, e0_5));
        });

        it('true - касающиеся сущности', () => {
            assert.ok(Entity.isIntersect(e0_0, e0_10));
        });
    });

    describe('distance - метод, определяющий расстояние между сущностями', () => {
        const e0_0 = new Entity({ x: 0, y: 0 }, 5);
        const e10_10 = new Entity({ x: 10, y: 10 }, 5);
        const e0_5 = new Entity({ x: 0, y: 5 }, 5);
        const e0_10 = new Entity({ x: 0, y: 10 }, 5);

        it('0 - если сущности персекаются', () => {
            const distance = Entity.distance(e0_0, e0_5);
            assertDouble(distance, 0);
        });

        it('0 - если сущности касаются', () => {
            const distance = Entity.distance(e0_0, e0_10);
            assertDouble(distance, 0);
        });

        it('расстояние между центрами с учетом радиусов сущностей', () => {
            const distance = Entity.distance(e0_0, e10_10);
            assertDouble(distance, Math.sqrt(200) - e0_0.r - e10_10.r);
        });
    });

    describe('isInWorld - проверяет находится ли сущность в допустимых координатах', () => {
        it('True, если находится', () => {
            assert.ok(Entity.isInWorld(new Entity({ x: 100, y: 100 }, 5)));
        });

        it('False, если не находится', () => {
            assert.ok(!Entity.isInWorld(new Entity({ x: 1000, y: 1000 }, 5)));
        });

        it('True, если находится на границе мира', () => {
            assert.ok(Entity.isInWorld(new Entity({ x: 0, y: 0 }, 5)));
        });
    });
});
