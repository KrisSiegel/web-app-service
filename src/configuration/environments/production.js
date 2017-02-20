/*
    ./src/configuration/environments/production.js

    The production configuration file.
*/
"use strict";

module.exports = {
    server: {
        workers: 4
    },
    logging: {
        error: true,
        warn: true,
        alert: true,
        info: false,
        trace: false
    }
};