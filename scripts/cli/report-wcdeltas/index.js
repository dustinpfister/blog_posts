#!/bin/env node
let path = require('path'),
dirs = require(path.join(__dirname, '../../lib/dirs/index.js'))(__dirname),
dObj = require(path.join(dirs.lib_folder, 'diff-days/index.js')),
promisify = require('util').promisify,
fs = require('fs'),
writeFile = promisify(fs.writeFile);


dObj.onlyFiles(process.argv[2] === undefined ? 1000 : process.argv[2])
.then((days) => {
    return days.map((dayObj) => {
        dayObj.files = dayObj.files.filter((fileName) => {
                return !!fileName.match(/^\_posts/)
            });
        dayObj.cats = getCats(dayObj.files);
        return dayObj;
    });
})
.then((days) => {
    console.log(days);
})
.catch((e) => {
    console.wran(e.message);
});
