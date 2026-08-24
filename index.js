import { logTypes, logTypeIds, logTypeStructs } from './src/parsingConstants.js'
import { parseLogLine } from './src/parser.js'
import { processLogStream } from "./src/streamingParser.js";
import { parseLogLineRegex } from "./src/oldRegexParser.js";
import { decodeDamage } from "./src/fieldDecoders.js";

export {
    parseLogLine,
    processLogStream,
    parseLogLineRegex,
    decodeDamage,
    logTypes,
    logTypeIds,
    logTypeStructs
}
