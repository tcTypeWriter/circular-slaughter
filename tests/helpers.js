
const DEFAULT_DELTA = Math.pow(10, -6);

const assert = require('assert');

exports.assertDouble = (actual, expected, delta) => {
    delta = delta || DEFAULT_DELTA;

    const check = Math.abs(actual - expected) < delta;

    assert.ok(check, `Expected: ${expected}, Actual: ${actual}`);
};
