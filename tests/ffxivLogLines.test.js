import { test } from 'node:test'
import assert from 'node:assert'
import { parseLogLine } from "../src/parser.js";

test('can parse game log line', (t) => {
    const logLine = '00|2024-12-03T20:38:16.0000000-05:00|0039||You have entered a sanctuary.|6a4df12a18d6dd9f'
    const expectedObject =  {
        code: '0039',
        line: 'You have entered a sanctuary.',
        name: '',
        timestamp: '2024-12-03T20:38:16.0000000-05:00',
        type: '00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse changeZone log line', (t) => {
    const logLine = '01|2024-12-03T20:38:17.3210000-05:00|84|New Gridania|abcd1234'
    const expectedObject =  {
        id: '84',
        name: 'New Gridania',
        timestamp: '2024-12-03T20:38:17.3210000-05:00',
        type: '01'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse changePrimaryPlayer log line', (t) => {
    const logLine = '02|2024-12-03T20:38:17.3210000-05:00|55555B5A|Producer Yoshida|abcd1234'
    const expectedObject =  {
        id: '55555B5A',
        name: 'Producer Yoshida',
        timestamp: '2024-12-03T20:38:17.3210000-05:00',
        type: '02'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse addCombatant log line', (t) => {
    const logLine = '03|2024-12-03T20:38:17.3210000-05:00|55555A5A|Producer Yoshida|18|5E|0000|69|Closet|0|0|69420|69421|10000|10000|||41.92|33.41|1.20|-2.06|abcd1234'
    const expectedObject =  {
        currentHp: '69420',
        currentMp: '10000',
        heading: '33.41',
        hp: '69421',
        id: '55555A5A',
        job: '18',
        level: '5E',
        mp: '10000',
        name: 'Producer Yoshida',
        npcBaseId: '0',
        npcNameId: '0',
        ownerId: '0000',
        timestamp: '2024-12-03T20:38:17.3210000-05:00',
        type: '03',
        world: 'Closet',
        worldId: '69',
        x: '',
        y: '',
        z: '41.92'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse removeCombatant log line', (t) => {
    const logLine = '04|2024-12-03T20:38:26.6060000-05:00|12345ACE|Producer Yoshida|12|F|0000|123|Mana|0|0|255|255|10000|10000|||12.34|12.34|1.23|-1.23|abcd1234'
    const expectedObject =  {
        currentHp: '255',
        heading: '-1.23',
        hp: '255',
        id: '12345ACE',
        job: '12',
        level: 'F',
        currentMp: '10000',
        mp: '10000',
        name: 'Producer Yoshida',
        npcBaseId: '0',
        npcNameId: '0',
        owner: '0000',
        timestamp: '2024-12-03T20:38:26.6060000-05:00',
        type: '04',
        world: 'Mana',
        x: '12.34',
        y: '12.34',
        z: '1.23'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse partyList log line', (t) => {
    const logLine = '11|2024-12-03T21:05:29.4640000-05:00|9|12345678|1234AB5C|123ABCD|1234ABCD|123ABCD4|B469420A|4321ABCD|ABCD123|1234abcdefg'
    const expectedObject =  {
        partyCount: '9',
        timestamp: '2024-12-03T21:05:29.4640000-05:00',
        type: '11'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse playerStats log line', (t) => {
    const logLine = '12|2024-12-03T21:05:31.8240000-05:00|22|222|111|666|22|333|111|222|444|555|11|555|111|222|222|333|3005123ABCDE47|1234abcdefg'
    const expectedObject =  {
        attackMagicPotency: '11',
        attackPower: '222',
        criticalHit: '555',
        determination: '111',
        dexterity: '111',
        directHit: '444',
        healMagicPotency: '555',
        intelligence: '22',
        job: '22',
        mind: '333',
        piety: '111',
        skillSpeed: '222',
        spellSpeed: '222',
        strength: '222',
        tenacity: '3005123ABCDE47',
        timestamp: '2024-12-03T21:05:31.8240000-05:00',
        type: '12',
        vitality: '666'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkStartsCasting log line', (t) => {
    const logLine = '20|2024-12-03T21:14:26.7950000-05:00|66642069|Producer Yoshida|330|unknown_111|66642069|Producer Yoshida|1.000|222.22|333.11|0.00|1.11|1234abcdefg'
    const expectedObject =  {
        ability: 'unknown_111',
        castTime: '1.000',
        heading: '1.11',
        id: '330',
        source: 'Producer Yoshida',
        sourceId: '66642069',
        target: 'Producer Yoshida',
        targetId: '66642069',
        timestamp: '2024-12-03T21:14:26.7950000-05:00',
        type: '20',
        x: '222.22',
        y: '333.11',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkAbility log line', (t) => {
    const logLine = '21|2024-12-03T21:14:28.2640000-05:00|66642069|Producer Yoshida|2024657|item_1234|66642069|Producer Yoshida|F0E|2024657|0|0|0|0|0|0|0|0|0|0|0|0|0|0|122222|122222|10000|10000|||101.11|101.11|0.00|3.00|122222|122222|10000|10000|||101.11|101.11|0.00|0.00|00000111|0|1|00||02|ABC0|221|1.111|ABC0|1234abcdefg'
    const expectedObject =  {
        ability: 'item_1234',
        actionAnimationId: '221',
        actionId: 'ABC0',
        animationLockTime: '1.111',
        currentHp: '122222',
        currentMp: '10000',
        damage: '2024657',
        effectDisplayType: '02',
        flags: 'F0E',
        heading: '0.00',
        id: '2024657',
        maxHp: '122222',
        maxMp: '10000',
        ownerId: '00',
        ownerName: '',
        rotationHex: 'ABC0',
        sequence: '00000111',
        source: 'Producer Yoshida',
        sourceId: '66642069',
        target: 'Producer Yoshida',
        targetCount: '1',
        targetCurrentHp: '122222',
        targetCurrentMp: '10000',
        targetHeading: '3.00',
        targetId: '66642069',
        targetIndex: '0',
        targetMaxHp: '122222',
        targetMaxMp: '10000',
        targetX: '101.11',
        targetY: '101.11',
        targetZ: '0.00',
        timestamp: '2024-12-03T21:14:28.2640000-05:00',
        type: '21',
        x: '101.11',
        y: '101.11',
        z: '0.00'
    }
    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkAOEAbility log line', (t) => {
    const logLine = '22|2024-12-03T21:14:53.9580000-05:00|66642069|Producer Yoshida|ABC0|Peloton|12345678|Producer Yoshida|0000000A|2024657|0|0|0|0|0|0|0|0|0|0|0|0|0|0|122222|122222|10000|10000|||101.11|101.11|0.00|3.00|122222|122222|10000|10000|||101.11|101.11|0.00|0.00|00000111|0|1|00||01|ABC0|ABC0|0.100|ABC0|1234abcdefg'
    const expectedObject =  {
        ability: 'Peloton',
        actionAnimationId: 'ABC0',
        actionId: 'ABC0',
        animationLockTime: '0.100',
        currentHp: '122222',
        currentMp: '10000',
        damage: '2024657',
        effectDisplayType: '01',
        flags: '0000000A',
        heading: '0.00',
        id: 'ABC0',
        maxHp: '122222',
        maxMp: '10000',
        ownerId: '00',
        ownerName: '',
        rotationHex: 'ABC0',
        sequence: '00000111',
        source: 'Producer Yoshida',
        sourceId: '66642069',
        target: 'Producer Yoshida',
        targetCount: '1',
        targetCurrentHp: '122222',
        targetCurrentMp: '10000',
        targetHeading: '3.00',
        targetId: '12345678',
        targetIndex: '0',
        targetMaxHp: '122222',
        targetMaxMp: '10000',
        targetX: '101.11',
        targetY: '101.11',
        targetZ: '0.00',
        timestamp: '2024-12-03T21:14:53.9580000-05:00',
        type: '22',
        x: '101.11',
        y: '101.11',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkCancelAbility log line', (t) => {
    const logLine = '23|2024-12-03T21:16:19.5320000-05:00|66642069|Producer Yoshida|66642069|Please Lookforward Toit|Cancelled|1234abcdefg'
    const expectedObject =  {
        id: '66642069',
        name: 'Please Lookforward Toit',
        reason: 'Cancelled',
        source: 'Producer Yoshida',
        sourceId: '66642069',
        timestamp: '2024-12-03T21:16:19.5320000-05:00',
        type: '23'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkDoT log line', (t) => {
    const logLine = '24|2024-12-03T21:16:19.5320000-05:00|66642069|Producer Yoshida|HoT|0|1234|123456|123456|1234|10000|||10.00|100.00|0.00|1.00|1234ABCD|Producer Yoshida|0|123456|123456|1234|10000|||100.00|100.00|0.00|1.00|1234abcdefg'
    const expectedObject =  {
        currentHp: '123456',
        currentMp: '1234',
        damage: '1234',
        damageType: '0',
        effectId: '0',
        heading: '1.00',
        id: '66642069',
        maxHp: '123456',
        maxMp: '10000',
        name: 'Producer Yoshida',
        source: 'Producer Yoshida',
        sourceCurrentHp: '123456',
        sourceCurrentMp: '1234',
        sourceHeading: '1.00',
        sourceId: '1234ABCD',
        sourceMaxHp: '123456',
        sourceMaxMp: '10000',
        sourceX: '100.00',
        sourceY: '100.00',
        sourceZ: '0.00',
        timestamp: '2024-12-03T21:16:19.5320000-05:00',
        type: '24',
        which: 'HoT',
        x: '10.00',
        y: '100.00',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkDeath log line', (t) => {
    const logLine = '25|2024-12-03T21:16:22.2990000-05:00|66642069|Producer Yoshida|E0000000||1234abcdefg'
    const expectedObject =  {
        source: '',
        sourceId: 'E0000000',
        target: 'Producer Yoshida',
        targetId: '66642069',
        timestamp: '2024-12-03T21:16:22.2990000-05:00',
        type: '25'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkBuff log line', (t) => {
    const logLine = '26|2024-12-03T21:16:28.1010000-05:00|A2D|Kardion|60.00|11234ABCD|Producer Yoshida|11234ABCD|Producer Yoshida|00|123456|123456|1234abcdefg'
    const expectedObject =  {
        count: '00',
        duration: '60.00',
        effect: 'Kardion',
        effectId: 'A2D',
        source: 'Producer Yoshida',
        sourceId: '11234ABCD',
        sourceMaxHp: '123456',
        target: 'Producer Yoshida',
        targetId: '11234ABCD',
        targetMaxHp: '123456',
        timestamp: '2024-12-03T21:16:28.1010000-05:00',
        type: '26'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkTargetIcon log line', (t) => {
    const logLine = '27|2024-12-03T21:17:19.0400000-05:00|66642069|Producer Yoshida|0000|0000|66642069|11234ABCD|0000|0000|1234abcdefg'
    const expectedObject =  {
        id: '66642069',
        target: 'Producer Yoshida',
        targetId: '66642069',
        timestamp: '2024-12-03T21:17:19.0400000-05:00',
        type: '27'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkRaidMarker log line', (t) => {
    const logLine = '28|2024-12-03T22:28:52.7020000-05:00|Delete|0|66642069|Producer Yoshida|0.00|0.00|0.00|1234abcdefg'
    const expectedObject =  {
        id: '66642069',
        name: 'Producer Yoshida',
        operation: 'Delete',
        timestamp: '2024-12-03T22:28:52.7020000-05:00',
        type: '28',
        waymark: '0',
        x: '0.00',
        y: '0.00',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkTargetMarker log line', (t) => {
    const logLine = '29|2024-12-03T22:43:16.6700000-05:00|Add|0|11234ABCD|Producer Yoshida|11234ABCD|Producer Yoshida|1234abcdefg'
    const expectedObject =  {
        id: '11234ABCD',
        name: 'Producer Yoshida',
        operation: 'Add',
        targetId: '11234ABCD',
        targetName: 'Producer Yoshida',
        timestamp: '2024-12-03T22:43:16.6700000-05:00',
        type: '29',
        waymark: '0'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkBuffRemove log line', (t) => {
    const logLine = '30|2024-12-03T22:43:16.7610000-05:00|AB1|Hammer Time|0.00|11234ABCD|Producer Yoshida|11234ABCD|Producer Yoshida|01|123456|123456|1234abcdefg'
    const expectedObject =  {
        count: '01',
        effect: 'Hammer Time',
        effectId: 'AB1',
        source: 'Producer Yoshida',
        sourceId: '11234ABCD',
        target: 'Producer Yoshida',
        targetId: '11234ABCD',
        timestamp: '2024-12-03T22:43:16.7610000-05:00',
        type: '30'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkGauge log line', (t) => {
    const logLine = '31|2024-12-03T22:43:17.9690000-05:00|66642069|1234|00|00|00|1234abcdefg'
    const expectedObject =  {
        id: '66642069',
        timestamp: '2024-12-03T22:43:17.9690000-05:00',
        type: '31'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkWorld log line', { skip: 'Not Implemented' }, (t) => {
    const logLine = ''
    const expectedObject =  {
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkActorControl log line', (t) => {
    const logLine = '33|2024-12-03T23:11:08.7160000-05:00|66642069|80000000|01|01|ABCD|11234ABCD|1234abcdefg'
    const expectedObject =  {
        command: '80000000',
        instance: '66642069',
        timestamp: '2024-12-03T23:11:08.7160000-05:00',
        type: '33'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkNameToggle log line', (t) => {
    const logLine = '34|2024-12-03T23:11:20.8430000-05:00|66642069|Usurper of Frost|11234ABCD|Usurper of Frost|01|1234abcdefg'
    const expectedObject =  {
        id: '66642069',
        name: 'Usurper of Frost',
        targetId: '11234ABCD',
        targetName: 'Usurper of Frost',
        timestamp: '2024-12-03T23:11:20.8430000-05:00',
        toggle: '01',
        type: '34'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkTether log line', (t) => {
    const logLine = '35|2024-12-03T23:14:15.9590000-05:00|66642069|Fatebreaker\'s Image|11234ABCD|Nerini Yume|0000|0000|ABC0|11234ABCD|ABC0|0000|1234abcdefg'
    const expectedObject =  {
        id: 'ABC0',
        source: "Fatebreaker's Image",
        sourceId: '66642069',
        target: 'Nerini Yume',
        targetId: '11234ABCD',
        timestamp: '2024-12-03T23:14:15.9590000-05:00',
        type: '35'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse limitBreak log line', (t) => {
    const logLine = '36|2024-12-03T23:14:17.3840000-05:00|1234|1|1234abcdefg'
    const expectedObject =  {
        bars: '1',
        timestamp: '2024-12-03T23:14:17.3840000-05:00',
        type: '36',
        valueHex: '1234'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkActionSync log line', (t) => {
    const logLine = '37|2024-12-03T23:14:18.1870000-05:00|66642069|Producer Yoshida|1234ABCD|123456|123456|10000|10000|11||100.00|100.00|0.00|1.00|ABC0|0|0|01|123456A|03|11234ABCD|11234ABCD|1234abcdefg'
    const expectedObject =  {
        currentHp: '123456',
        currentMp: '10000',
        currentShield: '11',
        heading: '1.00',
        id: '66642069',
        maxHp: '123456',
        maxMp: '10000',
        name: 'Producer Yoshida',
        sequenceId: '1234ABCD',
        timestamp: '2024-12-03T23:14:18.1870000-05:00',
        type: '37',
        x: '100.00',
        y: '100.00',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkStatusEffects log line', (t) => {
    const logLine = '38|2024-12-03T23:14:18.1870000-05:00|66642069|Producer Yoshida|1334ABCD|133223|142479|10000|10000|01||100.00|100.00|0.00|1.00|0|0|0|ABC0|DABC1234|1234ABCD|1234ABCD|45636800|1234ABCD|ABC0|0981DDEF|1234ABCD|ADE333|AAAA1111|11111AAA|0|0|0|ABC0|DABC1234|1478DDDD|ABCD|11234DBCD|12234ABCD|0|0|0|0|0|0|ABC0|11234ADCD|12134ABCD|ABC0|12345678|66642069|0|0|0|0001|11234ABCD|66642069|1234abcdefg\n'
    const expectedObject =  {
        currentShield: '01',
        data0: '0',
        data1: '0',
        data2: '0',
        data3: 'ABC0',
        data4: 'DABC1234',
        data5: '1234ABCD',
        heading: '1.00',
        hp: '133223',
        jobLevelData: '1334ABCD',
        maxHp: '142479',
        maxMp: '10000',
        mp: '10000',
        target: 'Producer Yoshida',
        targetId: '66642069',
        timestamp: '2024-12-03T23:14:18.1870000-05:00',
        type: '38',
        x: '100.00',
        y: '100.00',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse networkUpdateHP log line', (t) => {
    const logLine = '39|2024-12-03T23:14:20.9580000-05:00|66642069|Producer Yoshida|654321|123645|9876|10000|||100.00|100.00|0.00|-0.01|1234abcdefg'
    const expectedObject =  {
        currentHp: '654321',
        currentMp: '9876',
        heading: '-0.01',
        id: '66642069',
        maxHp: '123645',
        maxMp: '10000',
        name: 'Producer Yoshida',
        timestamp: '2024-12-03T23:14:20.9580000-05:00',
        type: '39',
        x: '100.00',
        y: '100.00',
        z: '0.00'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse map log line', (t) => {
    const logLine = '40|2024-12-03T23:56:54.7100000-05:00|123|Xak Tural|Solution Nine||1234abcdefg\n'
    const expectedObject =  {
        id: '123',
        placeName: 'Solution Nine',
        placeNameSub: '',
        regionName: 'Xak Tural',
        timestamp: '2024-12-03T23:56:54.7100000-05:00',
        type: '40'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse systemLogMessage log line', (t) => {
    const logLine = '41|2024-12-03T21:13:43.4620000-05:00|80000000|5FE|01|9999|00|1234abcdefg'
    const expectedObject =  {
        id: '5FE',
        instance: '80000000',
        timestamp: '2024-12-03T21:13:43.4620000-05:00',
        type: '41'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse statusList3 log line', (t) => {
    const logLine = '42|2024-12-03T21:13:46.0040000-05:00|66642069|Producer Yoshida|0|0|0|1234abcdefg'
    const expectedObject =  {
        id: '66642069',
        name: 'Producer Yoshida',
        timestamp: '2024-12-03T21:13:46.0040000-05:00',
        type: '42'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse debug log line', {skip: 'Not Implemented'},(t) => {
    const logLine = '1'
    const expectedObject =  {
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse packetDump log line', {skip: 'Not Implemented'},(t) => {
    const logLine = '1'
    const expectedObject =  {
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse version log line', {skip: 'Not Implemented'}, (t) => {
    const logLine = '1'
    const expectedObject =  {
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse error log line', {skip: 'Not Implemented'},(t) => {
    const logLine = '1'
    const expectedObject =  {
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})
