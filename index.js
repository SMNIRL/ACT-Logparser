import { logTypes, logTypeIds, logTypeStructs } from './src/parsingConstants.js'
import { parseLogLine } from './src/parser.js'
import { processLogStream } from "./src/streamingParser.js";
import { parseLogLineRegex } from "./src/oldRegexParser.js";

export {
    parseLogLine,
    processLogStream,
    parseLogLineRegex,
    logTypes,
    logTypeIds,
    logTypeStructs
}
