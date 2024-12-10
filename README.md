# ACT Logparser [![NodeJS Tests](https://github.com/SMNIRL/ACT-Logparser/actions/workflows/node.js.yml/badge.svg)](https://github.com/SMNIRL/ACT-Logparser/actions/workflows/node.js.yml) ![Latest Version](https://img.shields.io/github/package-json/v/SMNIRL/ACT-Logparser)
ACT Logparser is a Javascript library for parsing MMO network logs from [Advanced Combat Tracker](https://advancedcombattracker.com/).

It currently supports Final Fantasy 14 (FFXIV), with additional support for log types recorded by [OverlayPlugin](https://github.com/OverlayPlugin).
# Installation

You can clone the repo, or install via NPM/Yarn/etc with `npm i @smnirl/act-logparser`

# Usage

# One-off parsing

The `parseLogLine()` method will parse a single ACT Network Log line given as a string and return the result, along
with the line it appeared on within the stream synchronously.

e.g.
`23|2024-12-03T21:16:19.5320000-05:00|66642069|Producer Yoshida|66642069|Please Lookforward Toit|Cancelled|1234abcdefg`
will return as
```json
{
  "line": 273,
  "log":  {
      "id": "66642069",
      "name": "Please Lookforward Toit",
      "reason": "Cancelled",
      "source": "Producer Yoshida",
      "sourceId": "66642069",
      "timestamp": "2024-12-03T21:16:19.5320000-05:00",
      "type": "23"
    }
}
```

(The type definitions and log structure data used by this library are also exported as lookup table objects as 
`logTypes`, `logTypeIds` and `logTypeStructs` for your reference.)

# Parsing large files or real-time

The `processLogStream()` method accepts a ReadStream object and callback function, and will continue to
parse the given stream until it ends. This functionality calls the synchronous `parseLogLine()` method and returns its
result to your callback.

# Error Handling
The `parseLogLine()` function does not throw on errors or halt, instead, an `error` string is returned in the 
encapsulating object, along with an empty `log` object and the `line` of the stream at which the error occurred.

# Performance
As ACT network logs are entirely pipe-delimited, I used tokenization for this library instead of regex, as I saw other projects
doing. This approach provides a 40-70% speed up in processing time with lower(!) memory usage compared to parsing similarly
using regular expressions.

# Contributing
If you wish to make an improvement, fix bugs, etc. please feel free to open a Pull Request.

I will accept additions for other games that ACT supports if someone would like to add them, but you *must* include tests
for all log types added. I will reject PRs that add functionality without tests, and PRs that don't pass tests.
