const ItemTypes = {
    HEAL: 'HEAL',
    POSION: 'POSION',
};

const TrapTypes = {
    SAW: 'SAW',
};

const BulletTypes = {
    LIGHT: 'LIGHT',
    BALANCED: 'BALANCED',
    HEAVY: 'HEAVY',
};

const directions = {
    UP: 0b0001,
    RIGHT: 0b0010,
    DOWN: 0b0100,
    LEFT: 0b1000,
};

const rotateDirections = {
    CLOCKWISE: 'CLOCKWISE',
    COUNTER_CLOCKWISE: 'COUNTER_CLOCKWISE',
};

const balance = {
    MIN_X: 0,
    MAX_X: 800,
    MIN_Y: 0,
    MAX_Y: 600,

    NEW_TRAP_TIMEOUT: 15000,
    NEW_ITEM_TIMEOUT: 10000,

    MAX_PLAYER_HEALTH: 100,
    DEFAULT_PLAYER_SPEED: 5,

    HEAL_RADIUS: 15,
    HEAL_POWER: 25,

    POISON_RADIUS: 20,
    POISON_POWER: 3,
    POISON_TICKS: 10,
    POSION_TIME_INTERVAL: 1000,

    SAW_DAMAGE: 10,
    SAW_DAMAGE_INTERVAL: 1000,
    SAW_RADIUS: 40,
    SAW_SPEED: 2,

    BULLET_RADIUS: 5,

    BULLET_DAMAGE: {
        [BulletTypes.LIGHT]: 2,
        [BulletTypes.BALANCED]: 5,
        [BulletTypes.HEAVY]: 10,
    },

    BULLET_SPEED: {
        [BulletTypes.LIGHT]: 5,
        [BulletTypes.BALANCED]: 2,
        [BulletTypes.HEAVY]: 1,
    },
};

module.exports = {
    balance,
    ItemTypes,
    TrapTypes,
    BulletTypes,
    directions,
    rotateDirections,
};
