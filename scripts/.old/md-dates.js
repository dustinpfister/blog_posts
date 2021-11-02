/*
md-dates:

So this is a file that just logs counts for the number of posts
for each month of each year
 */
let klawFiles = require('./klaw.js').klawFiles;

let report = {};

klawFiles(function (item, next) {

    let d = new Date(item.header.date),
    fy = d.getFullYear(),
    m = d.getMonth();

    if (!report[fy]) {
        report[fy] = {};
    }
    if (!report[fy][m]) {
        report[fy][m] = 1;
    } else {
        report[fy][m] += 1;

    }

    next();

},

    function () {

    console.log(report);

});
