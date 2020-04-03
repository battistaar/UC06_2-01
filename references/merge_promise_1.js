const fs = require('fs');
const path = require('path');

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, {encoding: 'UTF-8'}, (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
}

function readResource(resource) {
    const resourcePath = './resources/';
    const file = path.join(resourcePath, resource);
    return readFile(file);
}

function mkdir(dirName) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirName, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

function appendFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function mergeResourcePromise(input1, input2) {
    const outputFile = './output/merged.txt';
    
    return mkdir('./output')
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
            return readFile(outputFile);
        });
}

mergeResourcePromise('input1.txt', 'input2.txt')
    .then(content => {
        console.log(content);
    })
    .catch(err => {
        console.error(err);
    });