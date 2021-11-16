#!/bin/env node
let path = require('path'),
dirs = require(path.join(__dirname, '../../lib/dirs/index.js'))(__dirname),
diffDays = require(path.join(dirs.lib_folder, 'diff-days/index.js')),
promisify = require('util').promisify,
fs = require('fs'),
writeFile = promisify(fs.writeFile);

diffDays.onlyFiles(process.argv[2] === undefined ? 50 : process.argv[2])
.then((days) => {
    return days.map((dayObj) => {
        dayObj.files = dayObj.files.filter((fileName) => {
                return !!fileName.match(/^\_posts/)
            });
        return dayObj;
    });
})
.then((days) => {
    console.log(days);
})
.catch((e) => {
    console.warn(e);
});
