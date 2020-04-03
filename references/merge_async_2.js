const fs = require('fs');
const path = require('path');
const util = require('util');
const outputHelper = require('./utils/check-output');

const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);

async function readResource(resource) {
    const resourcePath = './resources/';
    const file = path.join(resourcePath, resource);
    return readFile(file, {encoding: 'UTF-8'});
}

async function mergeResourcePromise(input1, input2, output) {
    const outputFile = path.join(outputHelper.OUTPUT_DIR, output);
    await outputHelper.removeOutputFile(output);

    const content1 = await readResource(input1);
    await appendFile(outputFile, content1);

    const content2 = await readResource(input2);
    await appendFile(outputFile, content2);
    return readFile(outputFile, {encoding: 'UTF-8'});
}

outputHelper.removeOutputFile('merged.txt')
    .then(_ => {
        return mergeResourcePromise('input1.txt', 'input2.txt', 'merged.txt');
    })
    .then(content => {
        console.log(content);
    })
    .catch(err => {
        console.error(err);
    });