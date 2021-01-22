# paths

A simple script to get all paths relavent to the blog_posts repo.

## To gets paths.js I still need to make sure I can do that to begin with

In order to get this file that helps create and return a standard object of all paths that I will want, I still need to be able to do that the right way. The path.join method of the path built in module must be used with \_\_dirname, and the proper relative path to get this script from another script.

```js
let path = require('path'),

// from a script at blog_posts/scripts/cli/footool/index.js
dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);
 
console.log( dir.cwd );         // current working dir
console.log( dir.blog_root );   // the root of the blog_root project folder
console.log( dir.this_script ); // path to this script
 
console.log( dir.script_folder ); // path to this script
console.log( dir.app_folder );    // path to this script
console.log( dir.cli_folder );    // path to this script
console.log( dir.posts );         // path to this script
```