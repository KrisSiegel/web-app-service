/*
    ./src/logging.js

    Sets up msngr to handle logging messages.
*/
"use strict";
const msngr = require("msngr");

// Various, available console foreground colors
const COLOR = Object.freeze({
    DEFAULT: "\x1b[0m",
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m"
});

// Converts incoming logging levels to a specified color
const LEVEL_TO_COLOR = Object.freeze({
    error: COLOR.RED,
    info: COLOR.WHITE,
    warn: COLOR.YELLOW,
    alert: COLOR.GREEN,
    trace: COLOR.WHITE
});

let config;
// If no config has been defined let all logging through
// Once config is specified, follow its rules explicitly
msngr("log").on((text, message) => {
    if (!config) {
        config = msngr.config.getDeep("service", "logging");
    }

    if (!config || config[message.category]) {
        let color = LEVEL_TO_COLOR[message.category] || COLOR.DEFAULT;
        console.log(`${color}${text}${COLOR.DEFAULT}`);
    }
});