const fs = require('fs');
const path = require('path');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);
const rmFile = util.promisify(fs.unlink);

function readResource(resource) {
    const resourcePath = './resources/';
    const file = path.join(resourcePath, resource);
    return readFile(file, {encoding: 'UTF-8'});
}

function mergeResourcePromise(input1, input2) {
    const outputFile = './output/merged.txt';
    
    return mkdir('./output')
        .catch(err => {
            if (err.code === 'EEXIST') {
                return rmFile(outputFile)
                    .catch(rmErr => {
                        return rmErr.code === 'ENOENT' ? Promise.resolve() : rmErr;
                    });
            } else {
                return err;
            }
        })
        .then(_ => {
            return readResource(input1);
        })
        .then(content => {
            return appendFile(outputFile, content);
        })
        .then(_ => {
            return readResource(input2);
        })
        .then(content => {
            return appendFile(outputFile, content);
        })
        .then(_ => {
            return readFile(outputFile, {encoding: 'UTF-8'});
        });
}

mergeResourcePromise('input1.txt', 'input2.txt')
    .then(content => {
        console.log(content);
    })
    .catch(err => {
        console.error(err);
    });