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
        hash(input)

        This method hashes passwords in two steps.
        1. Since bcrypt has a character limitation of 72 characters, we don't want
        the password to simply truncate so we sha256 the input first.
        2. We then take the sha256 input and appropriately send it through bcrypt
    */
    async hash(input) {
        return new Promise((resolve, reject) => {
            const sha256 = crypto.createHash("sha256");

            sha256.on("readable", async () => {
                const hash1 = sha256.read();
                if (hash1) {
                    try {
                        const hash2 = await bcrypt.hash(hash1.toString("hex"), BCRYPT_SALT_ROUNDS);
                        return resolve(hash2);
                    } catch (ex) {
                        return reject(ex);
                    }
                }
            });

            sha256.write(input);
            sha256.end();            
        });
    },
    /*
        compare(input, hash)

        Similar to the hash() method expect this is meant to handle proper bcrypt comparisons
    */
    async compare(input, hash) {
        return new Promise((resolve, reject) => {
            const sha256 = crypto.createHash("sha256");

            sha256.on("readable", async () => {
                const hash1 = sha256.read();
                if (hash1) {
                    try {
                        const match = await bcrypt.compare(hash1.toString("hex"), hash);
                        return resolve(match);
                    } catch (ex) {
                        return reject(ex);
                    }
                }
            });

            sha256.write(input);
            sha256.end();
        });
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