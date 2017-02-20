/*
    ./src/routes/health.js

    Handles returning health status for load balancers and others who care.
*/
"use strict";

module.exports = (app) => {
    app.get("/health", (req, res) => {
        res.status(200).send();
    });
};