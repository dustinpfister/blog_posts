let klawFiles = require('./klaw.js').klawFiles;

let report = {};

klawFiles(function (item) {

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

},

    function () {

    console.log(report);

});
