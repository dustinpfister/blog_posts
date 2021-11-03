let path = require('path');
// Should always give a dirname, failing
// to do so will result in a wrong dir.thisScript prop that
// will point to paths/index.js
let createDirObject = (dirname) => {
    // dirname defaults to this scripts location, which would often be Bad
    // so make sure to always pass the __dirname when calling this else the path
    // of 'dir.this_script' might not always be what is expected
    dirname = dirname === undefined ? __dirname : dirname
    // blog root
    var blog_root = path.join(__dirname, '../../..');
    // rteurn the dirs object
    return {
        cwd: process.cwd(),
        blog_root: blog_root,
        this_script: dirname,
        script_folder: path.join(blog_root, 'scripts'),
        lib_folder: path.join(blog_root, 'scripts/lib'),
        app_folder: path.join(blog_root, 'scripts/apps'),
        cli_folder: path.join(blog_root, 'scripts/cli'),
        posts: path.join(blog_root, '_posts')
    };
};
// if called from CLI
if (require.main === module) {
    console.log(createDirObject(__dirname));
} else {
    // export a dir object that is all the URIs
    // that I would want when making a script
    // for blog_posts
    module.exports = createDirObject;
}