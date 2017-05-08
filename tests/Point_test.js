const assert = require('assert');
const { assertDouble } = require('./helpers');


const Point = require('../model/Point');

describe('Point - сущность для координат обьектов', () => {

    describe('метод add - прибовляет к текущей точке координаты', () => {

        it('простое сложение', () => {
            let a = new Point({ x: 0, y: 0 });
            let b = new Point({ x: 10, y: 23 });

            let c = a.add(b);

            assert.equal(c.x, 10);
            assert.equal(c.y, 23);
        });

        it('метод add не возвращает текущий обьект Point', () => {
            let a = new Point({ x: 0, y: 0 });
            let b = new Point({ x: 10, y: 23 });

            assert.ok(a.add(b) !== a);
        });
    });
    describe('static fromRadial - создает точку из радиальной системы координат', () => {

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

    describe('getRandom - создает случайную точку внутри мира', () => {

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
