const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);
const rmFile = util.promisify(fs.unlink);

async function mergeResourcePromise(input1, input2) {
    const outputFile = './output/merged.txt';
    const resourcePath = './resources/';
    try {
        await mkdir('./output');
    } catch (err) {
        if (err.code === 'EEXIST') {
            try {
                await rmFile(outputFile);
            } catch (rmErr) {
                if (rmErr.code !== 'ENOENT') {
                    throw rmErr;
                }
            }
        } else {
            throw err;
        }
    }

    const file1 = path.join(resourcePath, input1);
    const content1 = await readFile(file1, {encoding: 'UTF-8'});
    await appendFile(outputFile, content1);

    const file2 = path.join(resourcePath, input2);
    const content2 = await readFile(file2, {encoding: 'UTF-8'});
    await appendFile(outputFile, content2);
    return readFile(outputFile, {encoding: 'UTF-8'});
}

// mergeResourcePromise('input1.txt', 'input2.txt')
//     .then(content => {
//         console.log(content);
//     })
//     .catch(err => {
//         console.error(err);
//     });

const Person = require('./utils/test');
new Person();