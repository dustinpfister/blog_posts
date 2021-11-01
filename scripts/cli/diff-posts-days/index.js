let path = require('path');
let dObj = require(path.join(__dirname, 'day-objects.js'))

// what calling this script does
dObj.getHashDateObjects(process.argv[2] === undefined ? 30 : process.argv[2])
.then((hashObjects) => {
    let days = dObj.getDayHashObjects(hashObjects);
    return dObj.getAllChangedFiles(days)
})
.then((days)=>{
    console.log(days);
});
