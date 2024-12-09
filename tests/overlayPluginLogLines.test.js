import { test } from 'node:test'
import assert from 'node:assert'
import { parseLogLine } from "../src/parser.js";

test('can parse lineRegistration log line', (t) => {
    const logLine = '256|2024-12-03T20:28:44.5623487-05:00|256|OverlayPlugin|RegisterLogLine|1|abcd1234'
    const expectedObject =  {
        id: '256',
        source: 'OverlayPlugin',
        timestamp: '2024-12-03T20:28:44.5623487-05:00',
        type: '256',
        version: 'RegisterLogLine'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse mapEffect log line', (t) => {
    const logLine = '257|2024-12-03T22:20:20.3560000-05:00|1234ABCD|00010001|01|00|0000|abcd1234'
    const expectedObject =  {
        flags: '00010001',
        instance: '1234ABCD',
        location: '01',
        timestamp: '2024-12-03T22:20:20.3560000-05:00',
        type: '257'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse fateDirector log line', (t) => {
    const logLine = '258|2024-09-09T22:32:25.1680000-04:00|Add|0000|00000001|00000002|00000003|00000004|00000005|000000060|00000007|abcd1234'
    const expectedObject =  {
        category: 'Add',
        fateId: '00000001',
        progress: '00000002',
        timestamp: '2024-09-09T22:32:25.1680000-04:00',
        type: '258'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse CEDirector log line', { skip: 'Not Implemented '}, (t) => {
    const logLine = ''
    const expectedObject =  {}

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse inCombat log line', (t) => {
    const logLine = '260|2024-09-09T22:34:02.6530000-04:00|1|0|1|0|abcd1234'
    const expectedObject =  {
        inACTCombat: '1',
        inGameCombat: '0',
        isACTChanged: '1',
        isGameChanged: '0',
        timestamp: '2024-09-09T22:34:02.6530000-04:00',
        type: '260'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse combatantMemory log line', (t) => {
    const logLine = '261|2024-09-09T22:34:02.8820000-04:00|Change|1001FFFF|Heading|1.0001|NPCTargetID|1001FAAF|PCTargetID|0001AADC|PosX|100.0001|PosY|100.0001|PosZ|10.0000|abcd1234\n'
    const expectedObject =  {
        change: 'Change',
        id: '1001FFFF',
        pairAggressionStatus: 'Heading',
        pairBNpcID: '1.0001',
        pairBNpcNameID: 'NPCTargetID',
        pairCastBuffID: '1001FAAF',
        pairCastDurationCurrent: 'PCTargetID',
        pairCastDurationMax: '0001AADC',
        pairCastGroundTargetX: 'PosX',
        pairCastGroundTargetY: '100.0001',
        pairCastGroundTargetZ: 'PosY',
        pairCastTargetID: '100.0001',
        pairCurrentCP: 'PosZ',
        pairCurrentGP: '10.0000',
        pairCurrentHP: undefined,
        pairCurrentMP: undefined,
        pairCurrentWorldID: undefined,
        pairDistance: undefined,
        pairEffectiveDistance: undefined,
        pairHeading: undefined,
        pairID: undefined,
        pairIsTargetable: undefined,
        pairJob: undefined,
        pairLevel: undefined,
        pairMaxCP: undefined,
        pairMaxGP: undefined,
        pairMaxHP: undefined,
        pairMaxMP: undefined,
        pairModelStatus: undefined,
        pairMonsterType: undefined,
        pairName: undefined,
        pairNPCTargetID: undefined,
        pairOwnerID: undefined,
        pairPartyType: undefined,
        pairPCTargetID: undefined,
        pairPosX: undefined,
        pairPosY: undefined,
        pairPosZ: undefined,
        pairRadius: undefined,
        pairStatus: undefined,
        pairTargetID: undefined,
        pairTransformationId: undefined,
        pairType: undefined,
        pairWeaponId: undefined,
        pairWorldID: undefined,
        pairWorldName: undefined,
        timestamp: '2024-09-09T22:34:02.8820000-04:00',
        type: '261'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse RSVData log line', (t) => {
    const logLine = '262|2024-11-26T21:03:10.9470000-05:00|en|00000010|_rsv_12345_-1_1_0_0_SEABC1234_EEABCD123||abcd1234'
    const expectedObject =  {
        key: '_rsv_12345_-1_1_0_0_SEABC1234_EEABCD123',
        locale: 'en',
        timestamp: '2024-11-26T21:03:10.9470000-05:00',
        type: '262',
        value: ''
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse startsUsingExtra log line', (t) => {
    const logLine = '263|2024-11-26T21:04:50.6940000-05:00|12345678|0001|100.001|100.001|0.000|1.001|abcd1234'
    const expectedObject =  {
        heading: '1.001',
        id: '0001',
        sourceId: '12345678',
        timestamp: '2024-11-26T21:04:50.6940000-05:00',
        type: '263',
        x: '100.001',
        y: '100.001',
        z: '0.000'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse abilityExtra log line', (t) => {
    const logLine = '264|2024-11-26T21:04:52.1640000-05:00|12345678|ABC1|000001AA|0|||||abcd1234'
    const expectedObject =  {
        dataFlag: '0',
        globalEffectCounter: '000001AA',
        heading: '',
        id: 'ABC1',
        sourceId: '12345678',
        timestamp: '2024-11-26T21:04:52.1640000-05:00',
        type: '264',
        x: '',
        y: '',
        z: ''
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse contentFinderSettings log line', (t) => {
    const logLine = '265|2024-11-25T00:36:33.3205565-05:00|A1B|Solution Nine|False|0|0|0|0|0|abcd1234'
    const expectedObject =  {
        explorerMode: '0',
        inContentFinderContent: 'False',
        levelSync: '0',
        minimalItemLevel: '0',
        silenceEcho: '0',
        timestamp: '2024-11-25T00:36:33.3205565-05:00',
        type: '265',
        unrestrictedParty: '0',
        zoneId: 'A1B',
        zoneName: 'Solution Nine'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse npcYell log line', (t) => {
    const logLine = '266|2024-11-25T00:31:41.2620000-05:00|1234567A|33E8|36C5|abcd1234'
    const expectedObject =  {
        npcId: '1234567A',
        npcNameId: '33E8',
        npcYellId: '36C5',
        timestamp: '2024-11-25T00:31:41.2620000-05:00',
        type: '266'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse battleTalk2 log line', (t) => {
    const logLine = '267|2024-11-25T00:37:36.8180000-05:00|00000000|80085000|AB1|ABC1|1000|0|1|0|0|abcd1234'
    const expectedObject =  {
        displayMs: '1000',
        instance: '80085000',
        instanceContentTextId: 'ABC1',
        npcId: '00000000',
        npcNameId: 'AB1',
        timestamp: '2024-11-25T00:37:36.8180000-05:00',
        type: '267'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse countdown log line', (t) => {
    const logLine = '268|2024-11-26T21:11:15.3130000-05:00|1234567A|ABC1|15|00|Producer Yoshida|abcd1234'
    const expectedObject =  {
        countdownTime: '15',
        id: '1234567A',
        name: 'Producer Yoshida',
        result: '00',
        timestamp: '2024-11-26T21:11:15.3130000-05:00',
        type: '268',
        worldId: 'ABC1'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse countdownCancel log line', (t) => {
    const logLine = '269|2024-11-26T23:50:20.3680000-05:00|1234567A|ABC1|Producer Yoshida|abcd1234'
    const expectedObject =  {
        id: '1234567A',
        name: 'Producer Yoshida',
        timestamp: '2024-11-26T23:50:20.3680000-05:00',
        type: '269',
        worldId: 'ABC1'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse actorMove log line', (t) => {
    const logLine = '270|2024-11-26T23:52:53.0610000-05:00|12345678|0.0001|0000|1BAC|100.0001|01.1001|0.0000|abcd1234'
    const expectedObject =  {
        heading: '0.0001',
        id: '12345678',
        timestamp: '2024-11-26T23:52:53.0610000-05:00',
        type: '270',
        x: '100.0001',
        y: '01.1001',
        z: '0.0000'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse actorSetPos log line', (t) => {
    const logLine = '271|2024-11-26T23:53:07.0400000-05:00|1234567A|1.0010|00|00|100.0001|100.1001|0.0110|abcd1234'
    const expectedObject = {
        heading: '1.0010',
        id: '1234567A',
        timestamp: '2024-11-26T23:53:07.0400000-05:00',
        type: '271',
        x: '100.0001',
        y: '100.1001',
        z: '0.0110'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse spawnNpcExtra log line', (t) => {
    const logLine = '272|2024-11-26T23:53:56.6180000-05:00|1234567A|A000000A|0000|00|abcd1234'
    const expectedObject =  {
        animationState: '00',
        id: '1234567A',
        parentId: 'A000000A',
        tetherId: '0000',
        timestamp: '2024-11-26T23:53:56.6180000-05:00',
        type: '272'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse actorControlExtra log line', (t) => {
    const logLine = '273|2024-11-26T23:53:58.8530000-05:00|12345678|1234|1ACB|0|0|0|abcd1234'
    const expectedObject =  {
        category: '1234',
        id: '12345678',
        timestamp: '2024-11-26T23:53:58.8530000-05:00',
        type: '273'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

test('can parse actorControlSelfExtra log line', (t) => {
    const logLine = '274|2024-11-28T21:10:05.8130000-05:00|1234567A|020F|EEE1|1111AA1A|1243|1|0|0|abcd1234'
    const expectedObject =  {
        category: '020F',
        id: '1234567A',
        timestamp: '2024-11-28T21:10:05.8130000-05:00',
        type: '274'
    }

    const parsedLogLine = parseLogLine(logLine);

    assert.notEqual(parsedLogLine.hasOwnProperty('error'), true, 'Log line parsed with error: ' + parsedLogLine.error);
    assert.deepEqual(parsedLogLine.log, expectedObject);
})

