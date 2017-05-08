const assert = require('assert');
const { assertDouble } = require('./helpers');


const Point = require('../model/Point');

describe('Point - сущность для координат обьектов', () => {
    describe('метод add - прибовляет к текущей точке координаты', () => {
        it('простое сложение', () => {
            const a = new Point({ x: 0, y: 0 });
            const b = new Point({ x: 10, y: 23 });

            const c = a.add(b);

            assert.equal(c.x, 10);
            assert.equal(c.y, 23);
        });

        it('метод add не возвращает текущий обьект Point', () => {
            const a = new Point({ x: 0, y: 0 });
            const b = new Point({ x: 10, y: 23 });

            assert.ok(a.add(b) !== a);
        });
    });

    describe('distance - расстояние до точки', () => {
        const e0_0 = new Point({ x: 0, y: 0 });
        const e10_0 = new Point({ x: 10, y: 0 });
        const e10_10 = new Point({ x: 10, y: 10 });

        function distanceTest(a, b, distance) {
            it(`Между ${a} и ${b} расстояние ${distance}`, () => {
                assertDouble(a.distance(b), distance);
                assertDouble(b.distance(a), distance);
            });
        }

        distanceTest(e0_0, e10_0, 10);
        distanceTest(e10_0, e10_10, 10);
        distanceTest(e0_0, e10_10, Math.SQRT2 * 10);
    });

    describe('length - длина вектора', () => {
        const e0_0 = new Point({ x: 0, y: 0 });
        const e5_0 = new Point({ x: 5, y: 0 });
        const e10_10 = new Point({ x: 10, y: 10 });

        it(`${e0_0}.length == 0`, () => {
            assertDouble(e0_0.length, 0);
        });

        it(`${e5_0}.length == 5`, () => {
            assertDouble(e5_0.length, 5);
        });

        it(`${e10_10}.length == ${10 * Math.SQRT2}`, () => {
            assertDouble(e10_10.length, 10 * Math.SQRT2);
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
