/*
    ./common/security.spec.js

    Unit testing for the security library.
*/
"use strict";

const expect = require("chai").expect;
const security = require("./security");

describe("./common/security.js", () => {
    it("security.hash(input, callback) exists", () => {
        expect(security.hash).to.exist;
    });

    it("security.hash(input, callback) generates hashes as expected", (done) => {
        security.hash("myPassWord", (hash1) => {
            expect(hash1).to.exist;
            expect(hash1).to.not.equal("myPassWord");

            security.hash("myPassword", (hash2) => {
                expect(hash2).to.exist;
                expect(hash2).to.not.equal("myPassword");

                security.hash("myPassWord", (hash3) => {
                    expect(hash3).to.exist;
                    expect(hash3).to.not.equal("myPassWord");
                    done();
                });
            });
        });
    });

    it("security.compare(input, hash, callback) compares hashes as expected", (done) => {
        security.hash("myPassWord", (hash1) => {
            expect(hash1).to.exist;
            expect(hash1).to.not.equal("myPassWord");

            security.hash("myPassword", (hash2) => {
                expect(hash2).to.exist;
                expect(hash2).to.not.equal("myPassword");

                security.hash("myPassWord", (hash3) => {
                    expect(hash3).to.exist;
                    expect(hash3).to.not.equal("myPassWord");

                    security.compare("myPassWord", hash1, (response1) => {
                        expect(response1).to.equal(true);

                        security.compare("myPassWord", hash2, (response2) => {
                            expect(response2).to.equal(false);
                            done();
                        });
                    });
                });
            });
        });
    });

    it("security.generateToken() returns a random token", () => {
        expect(security.generateToken).to.exist;
        const token1 = security.generateToken();
        const token2 = security.generateToken();
        const token3 = security.generateToken();

        expect(token1).to.exist;
        expect(token2).to.exist;
        expect(token3).to.exist;

        expect(token1).to.not.equal(token2);
        expect(token2).to.not.equal(token3);
        expect(token3).to.not.equal(token1);
    });
});
