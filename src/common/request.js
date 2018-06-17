/*
    ./src/common/request.js

    A customized request that can reject or accept attempts through configuration
*/
"use strict";
const express = require("express");

module.exports = (app) => {

    const intercept = (req, res, options, next) => {
        return next(req, res);
    };

    return {
        get(path, options, next) {
            console.info(`GET ${path} registered`);
            app.get(path, (req, res) => {
                console.info(`GET ${path}`);
                intercept(req, res, options, next);
            });
        },
        put(path, options, next) {
            console.info(`PUT ${path} registered`);
            app.put(path, (req, res) => {
                console.info(`PUT ${path}`);
                intercept(req, res, options, next);
            });
        },
        post(path, options, next) {
            console.info(`POST ${path} registered`);
            app.post(path, (req, res) => {
                console.info(`POST ${path}`);
                intercept(req, res, options, next);
            });
        },
        delete(path, options, next) {
            console.info(`DELETE ${path} registered`);
            app.delete(path, (req, res) => {
                console.info(`DELETE ${path}`);
                intercept(req, res, options, next);
            });
        },
        static(directory) {
            console.info(`Staticly serving ${directory}`);
            app.use(express.static(directory));
        }
    };
};