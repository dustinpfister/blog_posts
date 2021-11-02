let path = require('path');
let dObj = require(path.join(__dirname, 'day-objects.js'))

// only changed files in general
dObj.onlyFiles(process.argv[2] === undefined ? 30 : process.argv[2])
.then((days)=>{
    console.log(days);
});

/*
dObj.getHashDateObjects(process.argv[2] === undefined ? 30 : process.argv[2])
.then((hashObjects) => {
    return dObj.getDayHashObjects(hashObjects);
})
.then((days)=>{
    console.log(days);
});
*/
