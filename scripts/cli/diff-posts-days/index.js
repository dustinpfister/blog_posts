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

/*
let getFilesChanged = (n) => {
    n = n === undefined ? 20 : n;
    return new Promise((resolve, reject) => {
        let gitLog = spawn('git', ['log', '-n', n, '--name-only']);
        let str = '';
        gitLog.stdout.on('data', function (data) {
            str += data.toString();
        });
        gitLog.on('exit', function () {
            resolve(str);
        });
    });
};
*/

// get an array of objects that will be used for git diff calls like this:
/*
[
    { y:2021, m:10, d:31, startHash: '(firstHashForThisDay)', endHash: 'firstHashNotOnThisDay' }
]

*/
let getDayHashObjects = function(hashObjects){
    var y = '',
    m = '',
    d = '';
    return hashObjects.reverse().reduce((acc, hashObj)=>{
        let obj,
        cy = hashObj.date.getFullYear(),
        cm = hashObj.date.getMonth() + 1,
        cd = hashObj.date.getDate();
        // if same day
        if(cy === y && cm === m && cd === d){
            obj = acc[acc.length -1];
            if(obj){
               obj.endHash = hashObj.hash;
            }
        }else{
            y = cy; m = cm; d = cd; 
            // this is the endHash for the current object if we have one
            //obj = acc[acc.length -1];
            //if(obj){
            //   obj.endHash = hashObj.hash;
            //}
            // if not same day we need to update y,m,d and push a new object
            acc.push({
               y: y, m: m, d: d, startHash: hashObj.hash, endHash: hashObj.hash
            });
        }
        return acc;
    }, []);
};

// get changed files for a single dayObj
let getChangedFiles = (dayObj) => {
    return new Promise((resolve, reject) => {
        let gitDiff = spawn('git', ['diff', dayObj.startHash, dayObj.endHash, '--name-only']);
        let str = '';
        gitDiff.stdout.on('data', function (data) {
            str += data.toString();
        });
        gitDiff.on('exit', function () {
            dayObj.files = purgeEmpty(str.split(/\n|\r\n/));
            resolve(dayObj);
        });
    });
};


getHashDateObjects(20)
.then((hashObjects) => {

    let days = getDayHashObjects(hashObjects);

//console.log(hashObjects);
//console.log(days);

getChangedFiles(days[0])
.then((obj)=>{
console.log(' result: ');
console.log(obj);
});

/*
    let a = arr[arr.length - 1],
    b = arr[arr.length - 2];

//    console.log(a);
//    console.log(b);

    let gitDiff = spawn('git', ['diff', a.hash, b.hash, '--name-only']);
    let str = '';
    gitDiff.stdout.on('data', function (data) {
        str += data.toString();
    });
    gitDiff.on('exit', function () {
        console.log(str);
    });
*/

})
