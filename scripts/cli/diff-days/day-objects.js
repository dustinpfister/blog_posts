// paths
let path = require('path'),
os = require('os'),
dirs = require(path.join(__dirname, '../paths/index.js')).createDirObject(__dirname),
spawn = require('child_process').spawn;

// purge empty strings from an array
let purgeEmpty = (arr) => {
    return arr.filter(function (el) {
        return el != '';
    });
};

let api = {};

// use git log command to create an array of 'hash objects' containing commit hash ids, and dates for each commit
// going back a given number of commits that defaults to say 20
api.getHashDateObjects = (n) => {
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

// get an array of 'day objects' that will be used for git diff calls like this:
/*
[
{ y:2021, m:10, d:31, startHash: '(firstHashForThisDay)', endHash: 'firstHashNotOnThisDay' }
]

 */
api.getDayHashObjects = function (hashObjects) {
    var y = '',
    m = '',
    d = '';
    return hashObjects.reverse().reduce((acc, hashObj) => {
        let obj,
        cy = hashObj.date.getFullYear(),
        cm = hashObj.date.getMonth() + 1,
        cd = hashObj.date.getDate();
        // if same day
        if (cy === y && cm === m && cd === d) {
            obj = acc[acc.length - 1];
            if (obj) {
                obj.endHash = hashObj.hash;
            }
        } else {
            y = cy;
            m = cm;
            d = cd;
            // if not same day we need to update y,m,d and push a new object
            acc.push({
                y: y,
                m: m,
                d: d,
                startHash: hashObj.hash,
                endHash: hashObj.hash
            });
        }
        return acc;
    }, []);
};

// git diff helper function
var gDiff = (dayObj, optArr) => {
    optArr = optArr || ['--name-only'];
    return new Promise((resolve, reject) => {
        let gitDiff = spawn('git', ['diff', dayObj.startHash, dayObj.endHash].concat(optArr));
        let str = '';
        gitDiff.stdout.on('data', function (data) {
            str += data.toString();
        });
        gitDiff.on('exit', function () {
            //dayObj.files = purgeEmpty(str.split(/\n|\r\n/));
            resolve(str);
        });
    });
};

// call getChangedFiles for a whole collection of day objects
api.getAllChangedFiles = (days) => {
    return Promise.all(days.map((dayObj) => {
        return gDiff(dayObj, ['--name-only'])
        .then((str) => {
            dayObj.files = purgeEmpty(str.split(/\n|\r\n/));
            return dayObj;
        })
    }));
};

// Only files report
api.onlyFiles = (n) => {
    return api.getHashDateObjects(n === undefined ? 30 : n)
    .then((hashObjects) => {
        return api.getAllChangedFiles(api.getDayHashObjects(hashObjects));
    });
};

// export a public api for this module
module.exports = api;
