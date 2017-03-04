const assert = require('assert');

describe('Test example', () => {
    
    it('Пройденный тест (passing)', () => {
        assert(1 === 1);
    });

    it('Упавшый тест (failing)', () => {
        assert(1 === 0);
    });

    it('Спецификация / не реализованный тест (pending)');
});
