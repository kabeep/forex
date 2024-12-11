#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const resolve = (...args) => path.resolve(__dirname, ...args);
const palette = (code) => (text) => `\u001B[${code}m${text}\u001B[39m`;
const print = (label) => (text) => console.log(label, text);

function main() {
    const magenta = palette(36);
    const label = magenta('APP');
    const log = print(label);

    const srcStyleFilePath = '../build/demo-style.css';
    const destStyleFilePath = '../docs/assets/demo-style.css';
    fs.copyFileSync(resolve(srcStyleFilePath), resolve(destStyleFilePath))
    log(`cp ${magenta(srcStyleFilePath)} to ${magenta(destStyleFilePath)}`);

    const srcJsFilePath = '../build/app.js';
    const destJsFilePath = '../docs/assets/app.js';
    fs.copyFileSync(resolve(srcJsFilePath), resolve(destJsFilePath))
    log(`cp ${magenta(srcJsFilePath)} to ${magenta(destJsFilePath)}`);

    const srcJsMapFilePath = '../build/app.js.map';
    const destJsMapFilePath = '../docs/assets/app.js.map';
    fs.copyFileSync(resolve(srcJsMapFilePath), resolve(destJsMapFilePath))
    log(`cp ${magenta(srcJsMapFilePath)} to ${magenta(destJsMapFilePath)}`);

    const srcHtmlFilePath = '../build/index.html';
    const destHtmlFilePath = '../docs/documents/demo.html';
    fs.copyFileSync(resolve(srcHtmlFilePath), resolve(destHtmlFilePath))
    log(`cp ${magenta(srcHtmlFilePath)} to ${magenta(destHtmlFilePath)}`);
}

main();
