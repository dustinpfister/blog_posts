let genMap = require('./lib/genmap.js');
let opt = {
    sectionSize: 2,
    figWorth: function (w) {
        this.worth += 1;
    }
}
let arr = 'a a a a bb a a bb'.split(' ');
let section = genMap.sectionFromArray(arr, opt);
console.log(section);
