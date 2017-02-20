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
    const request = require("../common").request(app);

    // Remove x-powered-by express header because it's dumb
    app.disable('x-powered-by');

    // Massage the incoming request / extract data for easy access
    app.use((req, res, next) => {
        // Extract Authorization token; support formats "Bearer <token>" or just "<token>"
        const split = (req.header("authorization") || "").trim().split(" ");
        if (split[1] && split[1].length > 0) {
            req.token = split[1];
        } else if (split[0] && split[0].length > 0) {
            req.token = split[0];
        }

        return next();
    });

    // Iterate through the routes to set them up.
    const routesPath = path.join(__dirname, "..", "routes");
    const routes = fs.readdirSync(routesPath);
    if (msngr.is(routes).there && routes.length > 0) {
        for (let i = 0; i < routes.length; ++i) {
            if (routes[i].indexOf(".js") !== -1 && routes[i].indexOf(".spec.js") === -1) {
                var route = path.join(routesPath, routes[i]);
                try {
                    require(route)(request);
                } catch (ex) {
                    msngr("log", "error").emit(`Unable to load the routes in ${route} because\n${ex}`);
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