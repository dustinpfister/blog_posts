// paths
let path = require('path'),
os = require('os'),
dirs = require(path.join(__dirname, '../paths/index.js')).createDirObject(__dirname),
spawn = require('child_process').spawn;

// purge empty strings from an aray
let purgeEmpty = (arr) => {
    return arr.filter(function (el) {
        return el != '';
    });
};

let gitLog = spawn('git', ['log', '-n', '10', '--format=%H/%cD;']);
let str = '';
gitLog.stdout.on('data', function (data) {
    str += data.toString();
});
gitLog.on('exit', function () {
    var arr = purgeEmpty(str.trim().split(';'));
    arr = arr.map(function (str) {
            var a = str.split('/');
            return {
                date: new Date(a[1]),
                hash: a[0]
            }
        });
    console.log(arr);
});
