/*
    ./src/common/security.js

    A set of security related methods
*/
"use strict";

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const BCRYPT_SALT_ROUNDS = 10;

const api = {
    /*
        hash(input, callback)

        This method hashes passwords in two steps.
        1. Since bcrypt has a character limitation of 72 characters, we don't want
        the password to simply truncate so we sha256 the input first.
        2. We then take the sha256 input and appropriately send it through bcrypt
    */
    hash(input, callback) {
        const sha256 = crypto.createHash("sha256");

        sha256.on("readable", () => {
            const hash1 = sha256.read();
            if (hash1) {
                bcrypt.hash(hash1.toString("hex"), BCRYPT_SALT_ROUNDS, (err, hash2) => {
                    callback && callback.apply(this, [hash2]);
                });
            }
        });

        sha256.write(input);
        sha256.end();
    },
    /*
        compare(input, hash, callback)

        Similar to the hash() method expect this is meant to handle proper bcrypt comparisons
    */
    compare(input, hash, callback) {
        const sha256 = crypto.createHash("sha256");

        sha256.on("readable", () => {
            const hash1 = sha256.read();
            if (hash1) {
                bcrypt.compare(hash1.toString("hex"), hash, (err, res) => {
                    callback && callback.apply(this, [res]);
                });
            }
        });

        sha256.write(input);
        sha256.end();
    },
    /*
        generateToken()

        Generates a random token that can be used as an authorization token
    */
    generateToken() {
        return crypto.randomBytes(24).toString("hex");
    }
};

module.exports = api;   