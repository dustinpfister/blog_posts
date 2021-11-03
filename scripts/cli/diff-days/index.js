#!/bin/env node
let path = require('path'),
dirs = require(path.join(__dirname, '../../lib/dirs/index.js'))(__dirname),
dObj = require(path.join(dirs.lib_folder, 'diff-days/index.js'));

let n = process.argv[2] === undefined ? 1000 : process.argv[2];
// just hash date objects
/*
let dateOpt = {};
dObj.getHashDateObjects(n)
.then((hashCol) => {
hashCol.forEach((obj) => {
let t = obj.date.toLocaleTimeString('en-US', dateOpt),
d = obj.date.toLocaleDateString('en-US', dateOpt);
console.log( obj.hash  + ';' + d + ' ' + t );
})
});
 */

// only changed files in general

dObj.onlyFiles(process.argv[2] === undefined ? 30 : process.argv[2])
.then((days) => {
    // filter files for \_posts
    days = days.map((dayObj) => {
            dayObj.files = dayObj.files.filter((fileName) => {
                    return !!fileName.match(/^\_posts/)
                })
                return dayObj;
        });
    days.forEach((day) => {
        console.log(day);
    })
});
