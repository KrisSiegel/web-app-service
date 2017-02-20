/*
    ./src/routes/public.js

    Handles static content serving
*/
"use strict";
const path = require("path");
const express = require("express");

module.exports = (request) => {
    request.static(path.join(__dirname, "..", "..", 'public'));
};