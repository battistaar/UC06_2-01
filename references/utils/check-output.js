const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const rmFile = util.promisify(fs.unlink);

const OUTPUT_DIR = './output';
module.exports.OUTPUT_DIR = OUTPUT_DIR;

module.exports.createOutputFolder = async function() {
    try {
        await mkdir(OUTPUT_DIR);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

module.exports.removeOutputFile = async function(file) {
    const filePath = path.join(OUTPUT_DIR, file);
    try {
        await rmFile(filePath)
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
}