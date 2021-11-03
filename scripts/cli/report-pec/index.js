#!/bin/env node
let path = require('path'),
dirs = require(path.join(__dirname, '../../lib/dirs/index.js'))(__dirname),
dObj = require(path.join(dirs.lib_folder, 'diff-days/index.js')),
promisify = require('util').promisify,
fs = require('fs'),
writeFile = promisify(fs.writeFile);

let uri_html = path.join(dirs.user_folder, 'pec.html');

// create rows from days objects
let createRows = (days) => {
    var rows = [],
    colIndex = 0,
    hd = 0;
    days.forEach((dayObj) => {
        let d = new Date(dayObj.y, dayObj.m - 1, dayObj.d), // date object for this day
        wd = d.getDay(); // week day 0-6
        if (wd >= hd) {
            hd = wd;
        } else {
            hd = 0;
            colIndex += 1;
        }
        rows[colIndex] = rows[colIndex] === undefined ? [] : rows[colIndex];
        rows[colIndex][wd] = {
            dayObj: dayObj,
            d: d,
            fileCount: dayObj.files.length
        };
    });
    return rows;
};

let namesOnly = function(files){
    return '<span>' + files.map(function(fileName){
        return fileName.split('/')[1].split('.md')[0];
    }).join('<span></span><br>') + '</span><br>';
};

// create HTML from rows array of arrays
let createHTML = (rows) => {
    let html = '<body><table style="width:100%;text-align:center;">\n';
    html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thur</th><th>Fir</th><th>Sat</th></tr>\n';
    rows.forEach((row) => {
        var i = 0,
        col,
        len = 7;
        html += '<tr>';
        while (i < len) {
            col = row[i];
            if (col) {
                var dayObj = col.dayObj;
                html += '<td style="background:cyan;padding:5px;"> <h6>' + dayObj.m + '/' + dayObj.d + '/' + dayObj.y + ' </h6>' +
                '<p>cats: ' + dayObj.cats.join(',') + '</p>' +
                '<p>fileCount: ' + col.fileCount + '</p>'+
                '<p style="font-size:8pt;">files: ' + namesOnly( dayObj.files ) + '</p>'+
                '</td>';
            } else {
                html += '<td></td>';
            }
            i += 1;
        }
        html += '</tr>\n';
    })
    html += '</table></body>\n';
    return html;
};

// get 'cats' from file names
let getCats = (files) => {
    return files.map((fileName) => {
        return fileName.split('/')[1].split(/\-|\_/)[0];
    }).reduce((acc, el) => {
        if (!acc.some((a) => {
                return a === el
            })) {
            acc.push(el)
        }
        return acc;
    }, []);
};

// only changed files in general
//dObj.onlyFiles(process.argv[2] === undefined ? 30 : process.argv[2])
//dObj.onlyFiles('066e8e5d49d4f7474f8b5e46d41da13282e169e7')
dObj.onlyFiles(process.argv[2] === undefined ? 1000 : process.argv[2])
.then((days) => {
    // filter files for \_posts
    return days.map((dayObj) => {
        dayObj.files = dayObj.files.filter((fileName) => {
                return !!fileName.match(/^\_posts/)
            });
        dayObj.cats = getCats(dayObj.files);
        return dayObj;
    });
})
.then((days) => {
    // get rows and build html
    let rows = createRows(days);
    let html = createHTML(rows);
    // write file
    return writeFile(uri_html, html, 'utf8');
})
.then(() => {
    console.log('wrote new pec.html file at: ' + uri_html);
})
.catch((e) => {
    console.wran(e.message);
});
