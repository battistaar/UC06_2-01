const fs = require('fs');
const path = require('path');

function readResource(resource, callback) {
    const resourcePath = './resources/';
    const file = path.join(resourcePath, resource);
    fs.readFile(file, {encoding: 'UTF-8'}, (err, content) => {
        if (err) {
            callback(err);
        } else {
            callback(null, content);
        }
    })
}

function mergeResources(input1, input2, callback) {
    const outputFile = './output/merged.txt';
    fs.mkdir('./output', (err) => {
        if (err) {
            callback(err);
            return;
        }
        readResource(input1, (err, data1) => {
            if (err) {
                callback(err);
                return;
            }
            fs.appendFile(outputFile, data1, (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                readResource(input2, (err, data2) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    fs.appendFile(outputFile, data2, (err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        fs.readFile(outputFile, {encoding: 'UTF-8'}, (err, merged) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            callback(null, merged);
                        });
                    });
                })
            })
        })
    });
}

mergeResources('input1.txt', 'input2.txt', (err, content) => {
    if (err) {
        console.error(err);
    } else {
        console.log(content);
    }
});
