let path = require('path');

// from a script at blog_posts/scripts/cli/footool/index.js
let dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);
 
console.log( dirs.cwd );         // current working dir
console.log( dirs.blog_root );   // the root of the blog_root project folder
console.log( dirs.this_script ); // path to this script
 
console.log( dirs.script_folder ); // path to this script
console.log( dirs.app_folder );    // path to this script
console.log( dirs.cli_folder );    // path to this script
console.log( dirs.posts );         // path to this script
