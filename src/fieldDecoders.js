// Log types where the damage field uses the 0x4000 extended encoding
const extendedDamageTypes = new Set(['21', '22']);

/**
 * Decodes the raw hex damage field from an ACT log line into a numeric value
 *
 * For types 21/22 (networkAbility/networkAOEAbility): If bit 14 of the lower
 * 16 bits is set (0x4000 flag), the 4-byte value ABCD is rearranged to DAB
 * to reconstruct the correct damage value
 *
 * Otherwise, the upper 16 bits (AB) are the damage
 *
 * For type 24 (networkDoT): The damage field is a plain hex integer
 *
 * @param {string} damageHex - Raw hex string from the damage token
 * @param {string} logTypeId - The log type ID
 * @returns {number}
 */
function decodeDamage(damageHex, logTypeId) {
    if (!damageHex) return 0;

    const raw = parseInt(damageHex, 16);
    if (isNaN(raw) || raw === 0) return 0;

    if (!extendedDamageTypes.has(logTypeId)) {
        return raw;
    }

    const low16 = raw & 0xFFFF;
    const high16 = (raw >>> 16) & 0xFFFF;

    if (low16 & 0x4000) {
        const lowByte = low16 & 0xFF;
        return high16 | (lowByte << 16);
    }

    return high16;
}

function decInt(val) {
    if (val === undefined) return undefined;
    if (val === '') return 0;
    const n = parseInt(val, 10);
    return isNaN(n) ? 0 : n;
}

function decFloat(val) {
    if (val === undefined) return undefined;
    if (val === '') return 0;
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
}

function decHex(val) {
    if (val === undefined) return undefined;
    if (val === '') return 0;
    const n = parseInt(val, 16);
    return isNaN(n) ? 0 : n;
}

const FLAG_NAMES = {
    0x00: 'Nothing',
    0x01: 'Miss',
    0x03: 'Damage',
    0x05: 'Block',
    0x06: 'Parry',
    0x33: 'InstantDeath',
};

function decodeFlags(val) {
    if (val === undefined) return undefined;
    if (val === '') return 'Nothing';
    const raw = parseInt(val, 16);
    if (isNaN(raw)) return 'Nothing';
    const lowByte = raw & 0xFF;
    return FLAG_NAMES[lowByte] ?? `Unknown (0x${lowByte.toString(16).toUpperCase().padStart(2, '0')})`;
}

export const fieldDecoders = {
    "00": {
        code: decHex,
    },
    "03": {
        currentHp: decInt,
        currentMp: decInt,
        heading: decFloat,
        hp: decInt,
        job: decHex,
        level: decHex,
        mp: decInt,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "04": {
        currentHp: decInt,
        currentMp: decInt,
        heading: decFloat,
        hp: decInt,
        job: decHex,
        level: decHex,
        mp: decInt,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "11": {
        partyCount: decInt,
    },
    "12": {
        attackMagicPotency: decInt,
        attackPower: decInt,
        criticalHit: decInt,
        determination: decInt,
        dexterity: decInt,
        directHit: decInt,
        healMagicPotency: decInt,
        intelligence: decInt,
        job: decHex,
        mind: decInt,
        piety: decInt,
        skillSpeed: decInt,
        spellSpeed: decInt,
        strength: decInt,
        tenacity: decInt,
        vitality: decInt,
    },
    "20": {
        castTime: decFloat,
        heading: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "21": {
        animationLockTime: decFloat,
        currentHp: decInt,
        currentMp: decInt,
        damage: (val) => decodeDamage(val, '21'),
        effectDisplayType: decHex,
        flags: decodeFlags,
        heading: decFloat,
        maxHp: decInt,
        maxMp: decInt,
        rotationHex: decHex,
        targetCount: decInt,
        targetCurrentHp: decInt,
        targetCurrentMp: decInt,
        targetHeading: decFloat,
        targetIndex: decInt,
        targetMaxHp: decInt,
        targetMaxMp: decInt,
        targetX: decFloat,
        targetY: decFloat,
        targetZ: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "22": {
        animationLockTime: decFloat,
        currentHp: decInt,
        currentMp: decInt,
        damage: (val) => decodeDamage(val, '22'),
        effectDisplayType: decHex,
        flags: decodeFlags,
        heading: decFloat,
        maxHp: decInt,
        maxMp: decInt,
        rotationHex: decHex,
        targetCount: decInt,
        targetCurrentHp: decInt,
        targetCurrentMp: decInt,
        targetHeading: decFloat,
        targetIndex: decInt,
        targetMaxHp: decInt,
        targetMaxMp: decInt,
        targetX: decFloat,
        targetY: decFloat,
        targetZ: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "24": {
        currentHp: decInt,
        currentMp: decInt,
        damage: (val) => decodeDamage(val, '24'),
        heading: decFloat,
        maxHp: decInt,
        maxMp: decInt,
        sourceCurrentHp: decInt,
        sourceCurrentMp: decInt,
        sourceHeading: decFloat,
        sourceMaxHp: decInt,
        sourceMaxMp: decInt,
        sourceX: decFloat,
        sourceY: decFloat,
        sourceZ: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "26": {
        count: decHex,
        duration: decFloat,
        sourceMaxHp: decInt,
        targetMaxHp: decInt,
    },
    "28": {
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "30": {
        count: decHex,
    },
    "34": {
        toggle: decHex,
    },
    "36": {
        bars: decInt,
        valueHex: decHex,
    },
    "37": {
        currentHp: decInt,
        currentMp: decInt,
        currentShield: decInt,
        heading: decFloat,
        maxHp: decInt,
        maxMp: decInt,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "38": {
        currentShield: decInt,
        data0: decHex,
        data1: decHex,
        data2: decHex,
        data3: decHex,
        data4: decHex,
        data5: decHex,
        heading: decFloat,
        hp: decInt,
        jobLevelData: decHex,
        maxHp: decInt,
        maxMp: decInt,
        mp: decInt,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "39": {
        currentHp: decInt,
        currentMp: decInt,
        heading: decFloat,
        maxHp: decInt,
        maxMp: decInt,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "257": {
        flags: decHex,
        location: decHex,
    },
    "258": {
        progress: decHex,
    },
    "259": {
        numPlayers: decInt,
        progress: decHex,
        status: decHex,
    },
    "260": {
        inACTCombat: decInt,
        inGameCombat: decInt,
        isACTChanged: decInt,
        isGameChanged: decInt,
    },
    "261": {
        pairCurrentHP: decInt,
        pairCurrentMP: decInt,
        pairCurrentCP: decInt,
        pairCurrentGP: decInt,
        pairMaxHP: decInt,
        pairMaxMP: decInt,
        pairMaxCP: decInt,
        pairMaxGP: decInt,
        pairLevel: decInt,
        pairDistance: decFloat,
        pairEffectiveDistance: decFloat,
        pairHeading: decFloat,
        pairPosX: decFloat,
        pairPosY: decFloat,
        pairPosZ: decFloat,
        pairRadius: decFloat,
        pairCastDurationCurrent: decFloat,
        pairCastDurationMax: decFloat,
        pairCastGroundTargetX: decFloat,
        pairCastGroundTargetY: decFloat,
        pairCastGroundTargetZ: decFloat,
        pairJob: decHex,
        pairIsTargetable: decInt,
    },
    "263": {
        heading: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "264": {
        dataFlag: decHex,
        heading: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "265": {
        explorerMode: decInt,
        levelSync: decInt,
        minimalItemLevel: decInt,
        silenceEcho: decInt,
        unrestrictedParty: decInt,
    },
    "267": {
        displayMs: decInt,
    },
    "268": {
        countdownTime: decInt,
        result: decHex,
    },
    "270": {
        heading: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "271": {
        heading: decFloat,
        x: decFloat,
        y: decFloat,
        z: decFloat,
    },
    "272": {
        animationState: decHex,
    },
};

export { decodeDamage, decodeFlags };
