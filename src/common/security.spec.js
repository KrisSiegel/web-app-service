/*
    ./common/security.spec.js

    Unit testing for the security library.
*/
"use strict";

const expect = require("chai").expect;
const security = require("./security");

describe("./common/security.js", () => {
    it("security.hash(input) exists", () => {
        expect(security.hash).to.exist;
    });

    it("security.hash(input) generates hashes as expected", async () => {
        const hash1 = await security.hash("myPassWord");
        expect(hash1).to.exist;
        expect(hash1).to.not.equal("myPassWord");

        const hash2 = await security.hash("myPassword");
        expect(hash2).to.exist;
        expect(hash2).to.not.equal("myPassword");

        const hash3 = await security.hash("myPassWord");
        expect(hash3).to.exist;
        expect(hash3).to.not.equal("myPassWord");
    });

    it("security.compare(input, hash) compares hashes as expected", async () => {
        const hash1 = await security.hash("myPassWord");
        expect(hash1).to.exist;
        expect(hash1).to.not.equal("myPassWord");

        const hash2 = await security.hash("myPassword");
        expect(hash2).to.exist;
        expect(hash2).to.not.equal("myPassword");

        const hash3 = await security.hash("myPassWord");
        expect(hash3).to.exist;
        expect(hash3).to.not.equal("myPassWord");

        const response1 = await security.compare("myPassWord", hash1);
        expect(response1).to.equal(true);

        const response2 = await security.compare("myPassWord", hash2);
        expect(response2).to.equal(false);
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
