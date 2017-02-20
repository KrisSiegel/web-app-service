/*
    ./src/configuration/default.js

    The default configuration.
*/
"use strict";

module.exports = {
    development: {
        autoreload: false
    },
    server: {
        host: "0.0.0.0",
        port: 8081,
        workers: 1
    },
    logging: {
        error: true,
        warn: true,
        alert: true,
        info: false,
        trace: false
    }
};