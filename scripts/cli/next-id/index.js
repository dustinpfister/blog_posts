/*
let klawFiles = require('../../klaw.js').klawFiles;

let ct = 0;
klawFiles({
read: false,
forFile: (item, next) => {
ct += 1;
next();
},
onDone: () => {
console.log(ct); // should be the id
}

});
 */

let klawPosts = require('../klaw-basic').klawPosts,
ct = 0;

klawPosts({
    forPost: (item, next) => {
        ct += 1;
        next();
    },
    onDone: () => {
        console.log(ct);
    }
});
