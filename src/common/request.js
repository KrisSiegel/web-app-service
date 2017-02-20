/*
    ./src/common/request.js

    A customized request that can reject or accept attempts through configuration
*/
"use strict";
const express = require("express");
const msngr = require("msngr");

module.exports = (app) => {

    const intercept = (req, res, options, next) => {
        return next(req, res);
    };

    return {
        get(path, options, next) {
            msngr("log", "trace").emit(`GET ${path} registered`);
            app.get(path, (req, res) => {
                msngr("log", "trace").emit(`GET ${path}`);
                intercept(req, res, options, next)
            });
        },
        put(path, options, next) {
            msngr("log", "trace").emit(`PUT ${path} registered`);
            app.put(path, (req, res) => {
                msngr("log", "trace").emit(`PUT ${path}`);
                intercept(req, res, options, next)
            });
        },
        post(path, options, next) {
            msngr("log", "trace").emit(`POST ${path} registered`);
            app.post(path, (req, res) => {
                msngr("log", "trace").emit(`POST ${path}`);
                intercept(req, res, options, next)
            });
        },
        delete(path, options, next) {
            msngr("log", "trace").emit(`DELETE ${path} registered`);
            app.delete(path, (req, res) => {
                msngr("log", "trace").emit(`DELETE ${path}`);
                intercept(req, res, options, next)
            });
        },
        static(directory) {
            msngr("log", "trace").emit(`Staticly serving ${directory}`);
            app.use(express.static(directory));
        }
    };
};