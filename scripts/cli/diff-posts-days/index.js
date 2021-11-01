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

// use git log command to create an array of objects containing commit hash ids, and dates for each commit
// going back a given number of commits that defaults to say 20
let getHashDateObjects = (n) => {
    n = n === undefined ? 20 : n;
    return new Promise((resolve, reject) => {
        let gitLog = spawn('git', ['log', '-n', n, '--format=%H/%cD;']);
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
                        hash: a[0].trim()
                    }
                });
            resolve(arr);
        });
    });
};

getHashDateObjects(11)
.then((arr) => {

    let a = arr[arr.length - 1],
    b = arr[arr.length - 3];

    console.log(a);
    console.log(b);

    let gitDiff = spawn('git', ['diff', a.hash, b.hash, '--name-only']);
    let str = '';
    gitDiff.stdout.on('data', function (data) {
        str += data.toString();
    });
    gitDiff.on('exit', function () {
        console.log(str);
    });
})
