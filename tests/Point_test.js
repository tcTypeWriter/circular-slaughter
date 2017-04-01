const assert = require('assert');
const { assertDouble } = require('./helpers');


const Point = require('../model/Point');

describe('Point - сущность для координат обьектов', () => {

    describe.skip('метод add - прибовляет к текущей точке координаты', () => {
        it('простое сложение', () => {
            let a = new Point({ x: 0, y: 0 });
            let b = new Point({ x: 10, y: 23 });

            a.add(b);

            assert.equal(a.x, 10);
            assert.equal(a.y, 23);
        });

        it('метод add возвращает текущий обьект Point', () => {
            let a = new Point({ x: 0, y: 0 });
            let b = new Point({ x: 10, y: 23 });

            assert.equal(a.add(b), a);
        });
    });

    describe.skip('static fromRadial - создает точку из радиальной системы координат', () => {
        it('возвращает обьект Point', () => {
            const p = Point.fromRadial(0, 10);

            assert.ok(p instanceof Point);
        });

        it('проверка преобразования координат', () => {
            const p = Point.fromRadial(Math.PI / 6, 1);

            assertDouble(p.x, Math.sqrt(3) / 2);
            assertDouble(p.y, 1 / 2);
        });
    });

    describe.skip('getRandom - создает случайную точку внутри мира', () => {

        it('возвращает обьект Point', () => {
            const p = Point.getRandom();

            assert.ok(p instanceof Point);
        });

        it('Не создает подрят две одинаковые точки', () => {
            const p1 = Point.getRandom();
            const p2 = Point.getRandom();

            assert.notDeepEqual(p1, p2);
        });

    });

});
