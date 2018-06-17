/*
    ./src/routes/public.js

    Handles static content serving
*/
"use strict";

module.exports = (request) => {
    const path = require("path");
    
    request.static(path.join(__dirname, "..", "..", 'public'));
};