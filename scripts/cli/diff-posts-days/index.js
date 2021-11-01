let path = require('path');
let dObj = require(path.join(__dirname, 'day-objects.js'))

// what calling this script does
dObj.getHashDateObjects(30)
.then((hashObjects) => {
    let days = dObj.getDayHashObjects(hashObjects);
    return dObj.getAllChangedFiles(days)
})
.then((days)=>{
    console.log(days);
});
