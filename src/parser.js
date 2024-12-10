import {logTypeIds, logTypeStructs} from "./parsingConstants.js";

const delimiter = '|';

/**
 * Turns a log line into an object structured around its type
 *
 * If an error occurs, returns the error and line number, with an EMPTY log object, and continues parsing on the
 * next line.
 * @param {string} logLine
 * @param {int} [lineNumber]
 * @returns {{line: int, log: {}}|{line: int, log: {}, error: string}}
 */
function parseLogLine(logLine, lineNumber = 0) {
    let error;
    let parsedLogLine;

    const logTypeId = getLogLineType(logLine);

    try {
        const scaffold = {};
        const struct = logTypeStructs[logTypeId];
        if(!struct) {
            return {
                line: lineNumber,
                log: {},
                error: `Invalid or unsupported log line at row ${lineNumber}. Could not find struct for log type ID "${logTypeId}"`
            }
        }
        Object.assign(scaffold, struct);
        parsedLogLine = Object.seal(struct);
    } catch (e) {
        console.error(e.message, e);
        error = `Invalid or unsupported log line at row ${lineNumber}. Could not find struct for log type ID "${logTypeId}"`

        return {
            line: lineNumber,
            log: {},
            error: error
        };
    }

    const tokens = logLine.split(delimiter);
    tokens.pop(); // We don't care about the checksum(?) value/id at the end of the line
    const structKeys = Object.keys(parsedLogLine);

    try {
        structKeys.forEach((key) => {
            parsedLogLine[key] = tokens[logTypeStructs[logTypeId][key]]
        })
    } catch (e) {
        console.error(e.message, e);
        error = `Log line did not match extracted type (${logTypeId}:${logTypeIds[logTypeId]}) at line ${lineNumber}`

        return {
            line: lineNumber,
            log: {},
            error: error
        };
    }

    return {
        line: lineNumber,
        log: parsedLogLine
    }
}

function getLogLineType(logLine) {
    let typeEndPos = logLine.indexOf(delimiter);
    return logLine.substring(0, typeEndPos);
}

export {
    parseLogLine
}
