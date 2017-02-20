/*
    ./scripts/test.js

    Executes all unit tests specified with a *.spec.js
*/
"use strict";
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

const ignores = ["node_modules", "scripts", ".git", ".gitignore", "build", "public", "resources", "seeds"];

const files = [];
const buildFileList = (dir) => {
    const list = fs.readdirSync(dir);
    if (list && list.length > 0) {
        for (let i = 0; i < list.length; ++i) {
            const p = path.join(dir, list[i]);
            const stat = fs.statSync(p);
            let include = true;
            for (let j = 0; j < ignores.length; ++j) {
                if (p.indexOf(ignores[j]) !== -1) {
                    include = false;
                    break;
                }
            }

            if (include) {
                if (stat.isDirectory()) {
                    buildFileList(p);
                } else if (stat.isFile() && p.indexOf("spec.js") !== -1) {
                    files.push(p);
                }
            }
        }
    }
};

buildFileList("./");

exec("node node_modules/mocha/bin/mocha --reporter spec --colors " + files.join(" "), function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});
