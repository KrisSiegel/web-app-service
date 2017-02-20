/*
    ./src/routes/health.js

    Handles returning health status for load balancers and others who care.
*/
"use strict";

module.exports = (request) => {
    request.get("/health", { }, (req, res) => {
        res.status(200).send("OK");
    });
};