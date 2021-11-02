#!/bin/env node
let path = require('path'),
dirs = require( path.join(__dirname, '../../lib/dirs/index.js') )(__dirname),
dObj = require( path.join(dirs.lib_folder, 'diff-days/index.js') ),
promisify = require('util').promisify,
fs = require('fs'),
writeFile = promisify(fs.writeFile);



// only changed files in general
//dObj.onlyFiles(process.argv[2] === undefined ? 30 : process.argv[2])

dObj.onlyFiles('066e8e5d49d4f7474f8b5e46d41da13282e169e7')
.then((days) => {
    // filter files for \_posts
    return days.map((dayObj) => {
        dayObj.files = dayObj.files.filter((fileName) => {
            return !!fileName.match(/^\_posts/)
        })
        return dayObj;
    });
})
.then((days)=>{

    let html = '<body><table>\n';
    html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thur</th><th>Fir</th><th>Sat</th></tr>\n';

    var rows = [],
    colIndex = 0;
    days.forEach((dayObj) => {
        let d = new Date(dayObj.y, dayObj.m - 1, dayObj.d ), // date object for this day
        wd = d.getDay() // week day 0-6
        rows[colIndex] = rows[colIndex] === undefined ? [] : rows[colIndex];
        rows[colIndex][wd] = {
           fileCount: dayObj.files.length
        };
        if(d === 6){
            colIndex += 1;
        } 
    });

    rows.forEach((row)=>{
        var i = 0,
        col,
        len = 7;
        html += '<tr>';
        while(i < len){
            col = row[i];
            if(col){
                html += '<td>' + col.fileCount + '</td>';
            }else{
                html += '<td></td>';
            }
            i += 1;
        }
        html += '</tr>\n';
    })    

    html += '</table></body>\n';
//    console.log(html)
    return writeFile( path.join(dirs.this_script, 'pec.html'), html, 'utf8' );
});