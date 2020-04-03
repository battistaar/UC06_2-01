const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);
const rmFile = util.promisify(fs.unlink);

async function readResource(resource) {
    const resourcePath = './resources/';
    const file = path.join(resourcePath, resource);
    return readFile(file, {encoding: 'UTF-8'});
}

async function mergeResourcePromise(input1, input2) {
    const outputFile = './output/merged.txt';
    
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

    
    const content1 = await readResource(input1);
    await appendFile(outputFile, content1);

    const content2 = await readResource(input2);
    await appendFile(outputFile, content2);
    return readFile(outputFile, {encoding: 'UTF-8'});
}

mergeResourcePromise('input1.txt', 'input2.txt')
    .then(content => {
        console.log(content);
    })
    .catch(err => {
        console.error(err);
    });