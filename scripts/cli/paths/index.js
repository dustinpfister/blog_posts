let path = require('path');


// Should always give a dirname, failing
// to do so will result in a wrong dir.thisScript prop that
// will point to paths/index.js
let createDirObject = (dirname) => {

    dirname = dirname === undefined ? __dirname : dirname

    return {
        this_script: __dirname
    };

};


// if called from CLI
if (require.main === module) {
    // call klaw files
    console.log(createDirObject(__dirname));
} else {
    // export a dir object that is all the URIs
    // that I would want when making a script
    // for blog_posts
    exports.createDirObject = createDirObject;
}