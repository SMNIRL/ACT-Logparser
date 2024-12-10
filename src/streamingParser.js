import { ReadStream } from 'fs';
import { createInterface } from 'readline';
import { parseLogLine } from "./parser.js";

/**
 * @param {ReadStream} fileStream // ex. const fileStream = fs.createReadStream('Network_27201_20241208.log');
 * @param {processLogStream~parsedLogLineHandlerCallback} callback
 * @param {processLogStream~logLineParser} [logLineParser]
 * @returns {Promise<void>}
 */
async function processLogStream(fileStream, callback, logLineParser = parseLogLine) {
    const reader = createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let lineIndex = 1;

    for await (const line of reader) {
        callback(logLineParser(line, lineIndex))
        lineIndex++;
    }
}

/**
 * This callback handles log lines as they are parsed by the streaming processor.
 * @callback processLogStream~parsedLogLineHandlerCallback
 * @param {Object} parsedLogLine - An encapsulated log line object with optional error info
 * @param {Object} parsedLogLine.log - The parsed log line object, will be an empty object if an error occurred
 * @param {int} parsedLogLine.line - The line the log was read from in the stream
 * @param {String} [parsedLogLine.error] - An error message about the log line, will not exist if no error occurred
 */

/**
 * This callback parses log lines and returns a parsedLogLine object.
 * @callback processLogStream~logLineParser
 * @param {String} line - The raw network log line, pipe-delimited
 * @param {int} [lineIndex] - The location of the line in the stream.
 */

export {
    processLogStream
}
