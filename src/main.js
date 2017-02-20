/*
    ./src/main.js

    The main entry point into the node application. Here we initialize forks
*/
"use strict";
require("./logging");
const cluster = require("cluster");
const path = require("path");
const msngr = require("msngr");

// Attempt to load package.json; bail out if it isn't found!
try {
    const pkg = require(path.join(__dirname, "../package"));
    msngr.config.set("name", pkg.name);
} catch (ex) {
    return msngr("log", "error").emit("Unable to find package.json! It's either missing or you're executing from the wrong directory!");
}

// Attempt to load the default configuration; bail out if it isn't found!
try {
    const defaultConfiguration = require(path.join(__dirname, "./configuration", "default"));
    msngr.config.set("service", defaultConfiguration);
    msngr.config.set("environment", "default");
} catch (ex) {
    return msngr.log("log", "error").emit("Unable to find default configuration! it's either missing or you're executing from the wrong directory!");
}

// Figure out the environment configuration
const environment = process.env.environment || process.argv[2] || "development";

// Attempt to load the environmental configuration; warn if it isn't found!
try {
    const environmentConfiguration = require(path.join(__dirname, "./configuration", "environments", environment));
    msngr.config.set("service", environmentConfiguration);
    msngr.config.set("environment", environment);
} catch (ex) {
    msngr("log", "warn").emit(`Unable to find specified environment ${environment}'s configuration; using default only!`);
}

if (cluster.isMaster) {
    msngr("log", "alert").emit(`Starting ${msngr.config.get('name')} in the ${msngr.config.get('environment')} environment!`);

    const workers = msngr.config.getDeep("service", "server.workers", 1);
    const forks = new Array(workers);

    // Iterate through how many workers we're creating and create them
    for (let i = 0; i < workers; ++i) {
        msngr("log", "info").emit(`Initializing worker ${i}`);
        forks[i] = cluster.fork({ worker: i });
    }

    // Handle worker failures by restarting them
    cluster.on("exit", (fork, code, signal) => {
        for (let i = 0; i < forks.length; ++i) {
            if (forks[i] === fork) {
                if (code !== 0) {
                    msngr("log", "warn").emit(`Worker ${i} has failed. Attempting to restart it...`);
                }
                forks[i] = cluster.fork({ worker: i });
            }
        }
    });
} else if (cluster.isWorker) {
    // Autoreload for development purposes; not advisable to use in a production deployment!
    if (msngr.config.getDeep("service", "development.autoreload", false)) {
        const fs = require("fs");
        fs.watch("./src", { encoding: "utf8", recursive: true }, (eventType, filename) => {
            msngr("log", "warn").emit(`Reloading worker ${process.env.worker} due to new code changes!`, () => {
                process.exit();
            });
        });
    }

    // Require the web service to start it up!
    require("./services").web();
}