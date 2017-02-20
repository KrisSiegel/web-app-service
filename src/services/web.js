/*
    ./src/services/web.js

    The HTTP / HTTPS handling service
*/
"use strict";

const express = require("express");
const msngr = require("msngr");
const http = require("http");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    const app = express();
    const server = http.createServer(app);

    // Remove x-powered-by express header because it's dumb
    app.disable('x-powered-by');

    // Iterate through the routes to set them up.
    const routesPath = path.join(__dirname, "..", "routes");
    const routes = fs.readdirSync(routesPath);
    if (msngr.is(routes).there && routes.length > 0) {
        for (let i = 0; i < routes.length; ++i) {
            if (routes[i].indexOf(".js") !== -1 && routes[i].indexOf(".spec.js") === -1) {
                var route = path.join(routesPath, routes[i]);
                try {
                    require(route)(app);
                } catch (ex) {
                    msngr("log", "error").emit(`Unable to load the routes in ${route}!`);
                }
            }
        }
    }

    // Finally, time to tell the server to listen to the given port. Cross your fingers!
    server.listen(msngr.config.getDeep("service", "server.port"), () => {
        msngr("log", "alert").emit(`Worker ${process.env.worker} listening on port ${msngr.config.getDeep("service", "server.port")}`);
    });

    return server;
};