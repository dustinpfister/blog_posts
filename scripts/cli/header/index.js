let path = require('path');

// from a script at blog_posts/scripts/cli/footool/index.js
let dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);
 
console.log('cwd: ', dirs.cwd );                      // current working dir
console.log('blog_root: ', dirs.blog_root );          // the root of the blog_root project folder
console.log('this_script: ', dirs.this_script );      // path to this script
console.log('script_folder: ', dirs.script_folder );  // path to this script
console.log('app_folder: ', dirs.app_folder );        // path to this script
console.log('cli_folder: ', dirs.cli_folder );        // path to this script
console.log('dirs.posts: ', dirs.posts );             // path to this script
