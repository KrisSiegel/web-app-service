/*
    ./src/main.js

    The main entry point into the node application. Here we initialize forks
*/
"use strict";
const cluster = require("cluster");

const pkg = require("../package");
const config = require("./config");

if (cluster.isMaster) {
    console.info(`Starting ${pkg.name}!`);

    const workers = config.server.workers;
    const forks = new Array(workers);

    // Iterate through how many workers we're creating and create them
    for (let i = 0; i < workers; ++i) {
        console.info(`Initializing worker ${i}`);
        forks[i] = cluster.fork({ worker: i });
    }

    // Handle worker failures by restarting them
    cluster.on("exit", (fork, code, signal) => {
        for (let i = 0; i < forks.length; ++i) {
            if (forks[i] === fork) {
                if (code !== 0) {
                    console.warn(`Worker ${i} has failed. Attempting to restart it...`);
                }
                forks[i] = cluster.fork({ worker: i });
            }
        }
    });
} else if (cluster.isWorker) {
    // Autoreload for development purposes; not advisable to use in a production deployment!
    if (config.development.autoreload) {
        const fs = require("fs");
        fs.watch("./src", { encoding: "utf8", recursive: true }, () => {
            console.warn(`Reloading worker ${process.env.worker} due to new code changes!`, () => {
                process.exit();
            });
        });
    }

    // Require the web server to start it up!
    require("./servers/web")();
}