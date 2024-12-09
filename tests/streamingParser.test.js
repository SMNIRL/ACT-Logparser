import assert from 'node:assert'
import fs from 'node:fs';
import path from 'path';
import { test } from 'node:test'
import { parseLogLine } from "../src/parser.js";
import {processLogStream} from "../src/streamingParser.js";

const APP_ROOT = process.cwd()
const TEST_DATA_TESTLOG_MIXED = path.join(APP_ROOT, 'tests/testData/testlog_mixed.log')

test('can parse filestream as log data', async (t) => {
    const logFileStream = fs.createReadStream(TEST_DATA_TESTLOG_MIXED);

    const expectedLogLine4Object = {
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
    const expectedLogLine11Object = {
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

    let parsedLogs = []
    await processLogStream(logFileStream, (parsedLogLine) => {
        if (parsedLogLine.hasOwnProperty('error')) {
            console.error(parsedLogLine.error)
            assert.fail('Parsed log line returned with error(s).')
        }

        parsedLogs.push(parsedLogLine)
    }, parseLogLine).then(() => {
        assert.equal(parsedLogs.length, 12, 'Parsed log count did not match file log count.')

        assert.equal(parsedLogs[2].line, 3, 'Parsed logs out of order.');
        assert.equal(parsedLogs[7].line, 8, 'Parsed logs out of order.');
        assert.equal(parsedLogs[11].line, 12, 'Parsed logs out of order.');

        assert.deepEqual(parsedLogs[3].log, expectedLogLine4Object, 'Parsed log did not match expected parsed object.')
        assert.deepEqual(parsedLogs[10].log, expectedLogLine11Object, 'Parsed log did not match expected parsed object.')
    })

})
