/*
    ./src/config.js

    The configuration of the server
*/
"use strict";

module.exports = {
    development: {
        autoreload: false
    },
    server: {
        host: process.env.webapp_host || "0.0.0.0",
        port: process.env.webapp_post ||8081,
        workers: process.env.webapp_workers || 1
    }
};