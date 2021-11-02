let path = require('path');
let dObj = require(path.join(__dirname, 'day-objects.js'));

// only changed files in general
dObj.onlyFiles(process.argv[2] === undefined ? 30 : process.argv[2])
.then((days) => {
    // filter files for \_posts
    days = days.map((dayObj) => {
        dayObj.files = dayObj.files.filter((fileName) => {
            return !!fileName.match(/^\_posts/)
        })
        return dayObj;
    });
    days.forEach((day) => {
        console.log(day);
    })
});
