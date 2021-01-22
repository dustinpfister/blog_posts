let path = require('path');


// Should always give a dirname, failing
// to do so will result in a wrong dir.thisScript prop that
// will point to paths/index.js
let createDirObject = (dirname) => {

    dirname = dirname === undefined ? __dirname : dirname

    var blog_root = path.join(__dirname, '../../..');

    return {
        cwd: process.cwd(),
        blog_root: blog_root,
        this_script: dirname,
        script_folder: path.join(blog_root, 'scripts'),
        app_folder: path.join(blog_root, 'scripts/apps'),
        cli_folder: path.join(blog_root, 'scripts/cli'),
        posts: path.join(blog_root, '_posts')
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